/**
 * Comment.js
 * @author fangnx
 * @description
 * @created 2019-06-22T22:12:43.329Z-04:00
 * @copyright
 * @last-modified 2019-06-23T20:34:55.444Z-04:00
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	pid: {
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
	timeStamp: {
		type: String,
		required: true
	}
});

export default mongoose.model('comments', CommentSchema);
