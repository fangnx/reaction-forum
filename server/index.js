const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ExpressOIDC } = require('@okta/oidc-middleware');
// Database
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const ForbiddenError = epilogue.Errors.ForbiddenError;

const app = express();
const port = 3000;

// Loads .env file
require('dotenv').config();

app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: true, // Forces updating session
    saveUninitialized: false // Initializes a session even if not logged in
  })
);

const oidc = new ExpressOIDC({
  issuer: process.env.OKTA_ORG_URL,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  appBaseUrl: process.env.OKTA_BASE_URL,
  redirect_URI: process.env.REDIRECT_URL,
  scope: 'openid profile',
  routes: {
    callback: {
      path: '/authorization-code/callback',
      defaultRedirect: '/admin'
    }
  }
});

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  operatorAliases: false
});

const Post = database.define('posts', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
});

app.use(oidc.router);
app.use(cors());
app.use(bodyParser.json());

// Routing
app.get('/', (req, res) => {
  res.send('<p><h1>Welcome to Express!<h1><p>');
});

app.get('/admin', oidc.ensureAuthenticated(), (req, res) => {
  res.send('ADMIN Only!');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/home');
});

app.listen(port, () => console.log(`App is listening on port ${port}~~~`));
