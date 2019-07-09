/**
 * SubForum.js
 * @author fangnx
 * @description
 * @created 2019-06-24T17:47:30.031Z-04:00
 * @last-modified 2019-06-24T17:50:22.379Z-04:00
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubforumSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

export default mongoose.model('subforums', SubforumSchema);
