/**
 * User.js
 *
 * @author fangnx
 * @description
 * @created 2019-05-20T15:06:59.606Z-04:00
 * @copyright
 * @last-modified 2019-06-23T20:34:48.372Z-04:00
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['m', 'f', 'o'],
		required: true
	},
	avatar: {
		type: String,
		default:
			'https://firebasestorage.googleapis.com/v0/b/fangnx-rview.appspot.com/o/defaultUnisexAvatar.svg?alt=media&token=7c1142e6-4698-4d20-874e-385a652da894',
		required: false
	}
});

export default mongoose.model('users', UserSchema);
