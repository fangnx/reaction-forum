/**
 * postApi.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-23 00:52:32
 * @last-modified 2019-07-08 00:44:15
 */

import express from 'express';
import Post from '../models/Post';
import User from '../models/User';
import Comment from '../models/Comment';

const router = express.Router();

// Adds a Post.
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

// Deletes a Post.
router.post('/delete', (req, res) => {
	Post.deleteOne({ _id: req.body.pid })
		.then(value => res.json(value))
		.catch(err => console.log(err));
});

// Edits a Post.
router.post('/edit', (req, res) => {
	const update = {
		title: req.body.title,
		content: req.body.content,
		timeStamp: req.body.timeStamp,
		tags: req.body.tags
	};

	Post.update({ _id: req.body.pid }, update).then(value => res.json(value));
});

// Gets all Posts.
router.post('/findAll', (req, res) => {
	Post.find().then(v => res.json(v));
});

// Gets all Posts of a User.
router.post('/userposts', (req, res) => {
	Post.find({
		authorEmail: req.body.userEmail
	}).then(v => res.json(v));
});

// Adds a Comment to a Post.
router.post('/addComment', (req, res) => {
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

// Gets all Comments of a Post.
router.post('/postcomments', (req, res) => {
	// Checks if Post of the given pid exists
	Post.findOne({ _id: req.body.pid }).then(post => {
		if (!post) {
			return res.status(404).json({ postnotfound: 'Post not found' });
		}

		let avatarComments = [];
		Comment.find({ pid: req.body.pid })
			.then(async comments => {
				avatarComments = await comments.map(comment =>
					User.findOne({ email: comment.authorEmail }).then(value => {
						// Add authorAvatar attribute to Comment
						comment = comment.toObject();
						comment['authorAvatar'] = value.avatar;
						return comment;
					})
				);
				// Resolve when all promises in avatarComments have resolved
				Promise.all(avatarComments).then(values => {
					res.json(values);
				});
			})
			.catch(err => console.log(err));
	});
});

export { router as posts };
