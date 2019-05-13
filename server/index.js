const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
const port = 3000;

// loads .env file
require('dotenv').config();

app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: true, // forces updating session
    saveUninitialized: false // initializes a session even if not logged in
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

app.use(oidc.router);
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('<p><h1>Welcome to Express!<h1><p>');
});

app.listen(port, () => console.log(`App is listening on port ${port}~~~`));
