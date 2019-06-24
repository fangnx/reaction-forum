import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AvatarImage = new Schema({
	name: {
		type: String,
		default: 'none',
		required: true
	},
	imageData: {
		type: String,
		required: true
	}
});

export default mongoose.model('avatarimages', AvatarImage);
