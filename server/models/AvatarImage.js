/**
 * AvatarImage.js
 * @author fangnx
 * @description
 * @created 2019-06-23T20:44:01.170Z-04:00
 * @copyright
 * @last-modified 2019-06-23T21:06:46.206Z-04:00
 */

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
