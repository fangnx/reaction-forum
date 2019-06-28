/**
 * Post.js
 * @author fangnx
 * @description
 * @created 2019-06-10T21:26:08.092Z-04:00
 * @copyright
 * @last-modified 2019-06-24T18:02:38.583Z-04:00
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	authorEmail: {
		type: String,
		required: true
	},
	authorAvatar: {
		type: String,
		required: false
	},
	timeStamp: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: false
	},
	viewCount: {
		type: Number,
		required: true
	},
	likeCount: {
		type: Number,
		required: true
	},
	seenBy: {
		type: String,
		enum: ['public', 'social', 'private'],
		default: 'public',
		required: true
	},
	subforum: {
		type: String,
		required: false
	}
});

export default mongoose.model('posts', PostSchema);
