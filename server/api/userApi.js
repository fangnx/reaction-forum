/**
 * userApi.js
 * @author fangnx
 * @description
 * @created 2019-05-21T22:11:28.067Z-04:00
 * @copyright
 * @last-modified 2019-06-23T18:02:05.198Z-04:00
 */

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/config';
import User from '../models/User';
import AvatarImage from '../models/AvatarImage';
import { validateRegisterInputs } from '../validators/register';
import { validateLoginInputs } from '../validators/login';
import { getValues } from '@firebase/util';

const router = express.Router();

// Register endpoint
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInputs(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Check if email already registered
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: 'Email already registered.' });
		}
	});

	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		gender: req.body.gender,
		password: req.body.password,
		avatar: req.body.avatar
	});

	// Encrpyt password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser
				.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
		});
	});
});

// Login endpoint
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInputs(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Check if user exists
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json({ emailnotfound: 'Email not found' });
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// Include useful User attributes
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email,
					avatar: user.avatar
				};
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: 'Password incorrect' });
			}
		});
	});
});

// Get Avatar.ImageData of a User
router.post('/avatarimagedata', (req, res) => {
	User.findOne({ email: req.body.email }).then(value => res.json(value.avatar));
});

export { router as users };
