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
