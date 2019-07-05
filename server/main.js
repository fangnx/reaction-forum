import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import config from '../config/config';
import path from 'path';

import { users } from './api/userApi';
import { posts } from './api/postApi';
import { images } from './api/imageApi';
import { sources } from './api/rssSourceAPI';

import { postFromRssSource } from './rss';

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

// Connect to Mongoose
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Successfully connected to MongoDB ;)'))
	.catch(err => console.log(err));

app.use(express.static(path.join(__dirname, '../client/build')));
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

// Passport.js auth setup
app.use(passport.initialize());
app.use(passport.session());

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('./models/User');
const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
	User.findById(jwt_payload.id)
		.then(user => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch(err => console.log(err));
});

passport.use(strategy);

// postFromRssSource('https://rsshub.app/bbc', 'BBC', ['News', 'World'], 5);

// API Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/images', images);
app.use('/api/sources', sources);

app.listen(port, () => console.log(`App listening on port ${port} !`));
// app.listen(port, '172.31.44.200', () => console.log(`App listening on port ${port} !`));
