/**
 * forumAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-08 00:37:04
 * @last-modified 2019-07-09 00:13:14
 */

import express from 'express';
import Subforum from '../models/Subforum';
import Post from '../models/Post';

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

// Gets all Subforums.
router.post('/all', (req, res) => {
	Subforum.find()
		.then(subforums => res.json(subforums))
		.catch(err => console.log(err));
});

// Gets all Posts in a Subforum
router.post('/allposts', (req, res) => {
	Post.find({ subforum: req.body.name })
		.then(posts => res.json(posts))
		.catch(err => console.log(err));
});

export { router as subforums };
