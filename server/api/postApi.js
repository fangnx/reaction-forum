import express from 'express';
import Post from '../models/Post';

const router = express.Router();

// Add Post
router.post('/add', (req, res) => {
	// TODO: validation

	const newPost = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		authorEmail: req.body.authorEmail,
		timeStamp: req.body.timeStamp,
		tags: req.body.tags,
		viewCount: req.body.viewCount,
		likeCount: req.body.likeCount
	});

	newPost
		.save()
		.then(post => res.json(post))
		.catch(err => console.log(err));
});

// Delete Post
router.post('/delete', (req, res) => {
	Post.deleteOne({ _id: req.body.pid })
		.then(value => res.json(value))
		.catch(err => console.log(err));
});

// Edit Post
router.post('/edit', (req, res) => {
	const update = {
		title: req.body.title,
		content: req.body.content,
		timeStamp: req.body.timeStamp,
		tags: req.body.tags
	};

	Post.update({ _id: req.body.pid }, update).then(value => res.json(value));
});

// Get all Posts
router.post('/findAll', (req, res) => {
	Post.find().then(v => res.json(v));
});

// Get all Posts of a User
router.post('/userposts', (req, res) => {
	Post.find({
		authorEmail: req.body.userEmail
	}).then(v => res.json(v));
	// Post.find({ author: 'nxxinf' }).then(v => res.json(v));
});

export { router as posts };
