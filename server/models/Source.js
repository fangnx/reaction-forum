/**
 * Source.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-04 19:58:01
 * @last-modified 2019-07-05 00:36:31
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SourceSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	sourceUrl: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	category: {
		type: String,
		default: 'News',
		required: true
	},
	avatar: {
		type: String,
		default:
			'https://firebasestorage.googleapis.com/v0/b/fangnx-rview.appspot.com/o/defaultUnisexAvatar.svg?alt=media&token=7c1142e6-4698-4d20-874e-385a652da894',
		required: false
	},
	// Always active when Source is first subscribed.
	active: {
		type: Boolean,
		default: true,
		required: true
	},
	// Number of items that can be posted per day.
	dailyLimit: {
		type: Number,
		default: 10,
		required: true
	}
});

export default mongoose.model('sources', SourceSchema);
