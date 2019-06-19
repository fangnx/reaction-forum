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
	}
});

export default mongoose.model('posts', PostSchema);
