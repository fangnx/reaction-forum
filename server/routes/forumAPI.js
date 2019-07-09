/**
 * forumAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-08 00:37:04
 * @last-modified 2019-07-08 01:28:53
 */

import express from 'express';
import Subforum from '../models/Subforum';

const router = express.Router();

// Adds a Subforum.
router.post('/add', (req, res) => {
	const newSubforum = new Subforum({
		name: req.body.name
	});

	newSubforum
		.save()
		.then(subforum => res.json(subforum))
		.catch(err => console.log(err));
});

// Gets all subforums.
router.post('/all', (req, res) => {
	Subforum.find()
		.then(subforums => res.json(subforums))
		.catch(err => console.log(err));
});

export { router as subforums };
