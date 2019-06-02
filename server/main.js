import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import flash from 'connect-flash';

import { users } from './api/users';
import config from '../config/config';
import path from 'path';

const app = new express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = config.mongodb;
const MongoStore = connectMongo(session);
const port = config.port;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDB ;)'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'client/public')));
app.use(
  session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false, // creates a session even not logged in
    cookie: {
      maxAge: config.session.maxAge // session expiry time
    },
    store: new MongoStore({
      url: config.mongodb // stores session into mongodb
    })
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(flash());

app.use(passport.initialize());
// require('../config/passport')(passport);

app.use('/api/users', users);

app.listen(port, () => console.log(`App listening on port ${port} !`));
