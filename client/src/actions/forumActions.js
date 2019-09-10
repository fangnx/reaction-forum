/**
 * forumActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-08 00:53:27
 * @last-modified 2019-07-09 01:19:32
 */

import axios from 'axios';

export const addSubforum = async data => {
	return axios
		.post('/api/subforums/add', data)
		.then(res => res)
		.catch(err => console.log(`Add Subforum Error: ${err}`));
};

export const getAllSubforums = async () => {
	return axios
		.post('/api/subforums/all')
		.then(res => res)
		.catch(err => console.log(`Get all Subforums Error: ${err}`));
};

export const getAllPostsInSubforum = async data => {
	return axios
		.post('/api/subforums/allposts', data)
		.then(res => res)
		.catch(err => console.log(`Get all Posts of Subforum Error: ${err}`));
};
