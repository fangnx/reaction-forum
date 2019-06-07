import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import flash from 'connect-flash';
// import '../config/passport';

import { users } from './api/users';
import config from '../config/config';
import path from 'path';

const app = new express();

app.use(
  bodyParser.urlencoded({
    extended: true
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

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('../models/User');
const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

console.log(opts);

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('!!!' + jwt_payload);
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        console.log('passport user found');
        return done(null, user);
      }
      console.log('passport user found');
      return done(null, false);
    })
    .catch(err => console.log(err + '1'));
});

passport.use(strategy);

app.use('/api/users', users);

app.listen(port, () => console.log(`App listening on port ${port} !`));
