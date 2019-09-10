/**
 * postAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-23 00:52:32
 * @last-modified 2019-09-09 23:52:46
 */

import express from 'express';
import Post from '../models/Post';
import User from '../models/User';
import Comment from '../models/Comment';
import { validatePostInputs } from '../validators/postValidator';

const router = express.Router();

// Add a post.
router.post('/add', (req, res) => {
	const { errors, isValid } = validatePostInputs(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		authorEmail: req.body.authorEmail,
		timeStamp: req.body.timeStamp,
		tags: req.body.tags,
		viewCount: req.body.viewCount,
		likeCount: req.body.likeCount,
		subforum: req.body.subforum
	});

	newPost
		.save()
		.then(post => res.json(post))
		.catch(err => console.log(err));
});

// Delete a post.
router.post('/delete', (req, res) => {
	Post.deleteOne({ _id: req.body.pid })
		.then(value => res.json(value))
		.catch(err => console.log(err));
});

// Edit a post.
router.post('/edit', (req, res) => {
	const { errors, isValid } = validatePostInputs(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const update = {
		title: req.body.title,
		content: req.body.content,
		timeStamp: req.body.timeStamp,
		tags: req.body.tags
	};

	Post.update({ _id: req.body.pid }, update).then(value => res.json(value));
});

// Get all posts.
router.post('/findall', (req, res) => {
	Post.find().then(v => res.json(v));
});

// Get all posts of a user.
router.post('/userposts', (req, res) => {
	Post.find({
		authorEmail: req.body.userEmail
	}).then(v => res.json(v));
});

// Add a comment to a post.
router.post('/addcomment', (req, res) => {
	Post.findOne({ _id: req.body.pid }).then(post => {
		if (!post) {
			return res.status(404).json({ postnotfound: 'Post not found' });
		}

		const newComment = new Comment({
			content: req.body.content,
			pid: req.body.pid,
			author: req.body.author,
			authorEmail: req.body.authorEmail,
			timeStamp: req.body.timeStamp
		});

		newComment
			.save()
			.then(comment => res.json(comment))
			.catch(err => console.log(err));
	});
});

// Get all comments of a post.
router.post('/postcomments', (req, res) => {
	// Check if the post of the given pid exists.
	Post.findOne({ _id: req.body.pid }).then(post => {
		if (!post) {
			return res.status(404).json({ postnotfound: 'Post not found' });
		}

		let avatarComments = [];
		Comment.find({ pid: req.body.pid })
			.then(async comments => {
				avatarComments = await comments.map(comment =>
					User.findOne({ email: comment.authorEmail }).then(value => {
						// Add authorAvatar attribute to comment.
						comment = comment.toObject();
						comment['authorAvatar'] = value.avatar;
						return comment;
					})
				);
				// Resolve when all promises in avatarComments have resolved.
				Promise.all(avatarComments).then(values => {
					res.json(values);
				});
			})
			.catch(err => console.log(err));
	});
});

export { router as posts };
