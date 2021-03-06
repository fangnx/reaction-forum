import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import config from '../config/config';
import path from 'path';

import { users } from './routes/userAPI';
import { subforums } from './routes/forumAPI';
import { posts } from './routes/postAPI';
import { images } from './routes/imageAPI';
import { sources } from './routes/rssSourceAPI';
import { postDailySubscriptions } from './rssService';

require('dotenv').config();

const app = new express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

const host = process.env.HOST || config.HOST;
const port = process.env.PORT || config.port;
const db = process.env.MONGODB_URI || config.mongodb;
const MongoStore = connectMongo(session);

// Database setup with Mongoose.
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
		saveUninitialized: false, // Create a session even not logged in.
		cookie: {
			maxAge: config.session.maxAge // Session expiry time.
		},
		store: new MongoStore({
			url: db // Store session into mongodb.
		})
	})
);

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);

// Passport.js authentication setup.
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

// Cron Job to post content from daily RSS subscriptions.
postDailySubscriptions().start();

// API routes.
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/subforums', subforums);
app.use('/api/images', images);
app.use('/api/sources', sources);

app.listen(port, () =>
	console.log(`Reaction Forum is running on http://${host}:${port}/ :)`)
);
