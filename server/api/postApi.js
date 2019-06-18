import express from 'express';
import keys from '../../config/config';
import Post from '../../models/Post';

const router = express.Router();

// Add Post
router.post('/add', (req, res) => {
	// TODO: validation

	const newPost = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		authorId: req.body.authorId,
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
	Post.deleteOne({ _id: req.body.id })
		.then(result => res.json(result))
		.catch(err => console.log(err));
});

// Get all Posts
router.post('/findAll', (req, res) => {
	Post.find().then(v => res.json(v));
});

// Get all Posts of a User
router.post('/userposts', (req, res) => {
	Post.find({ authorId: req.body.userId }).then(v => res.json(v));
});

export { router as posts };
