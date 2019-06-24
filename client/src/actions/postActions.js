/**
 * postActions.js
 * @author fangnx
 * @description
 * @created 2019-06-11T23:59:00.196Z-04:00
 * @copyright
 * @last-modified 2019-06-23T23:47:00.794Z-04:00
 */

import axios from 'axios';

export const addPost = async data => {
	return axios
		.post('http://localhost:5000/api/posts/add', data)
		.then(res => res)
		.catch(err => console.log(`Add Post Error: ${err}`));
};

export const deletePost = async data => {
	return axios
		.post('http://localhost:5000/api/posts/delete', data)
		.then(res => res);
};

export const editPost = async data => {
	return axios
		.post('http://localhost:5000/api/posts/edit', data)
		.then(res => res);
};

export const getAllPosts = async () => {
	return axios
		.post('http://localhost:5000/api/posts/findAll')
		.then(res => res)
		.catch(err => console.log(`Get all Posts Error: ${err}`));
};

/**
 *
 * @param {*} data userEmail
 */
export const getAllPostsOfUser = async data => {
	return axios
		.post('http://localhost:5000/api/posts/userposts', data)
		.then(res => res)
		.catch(err => console.log(`Get all Posts of User Error: ${err}`));
};

export const addComment = async data => {
	return axios
		.post('http://localhost:5000/api/posts/addComment', data)
		.then(res => res)
		.catch(err => console.log(`Add Comment Error: ${err}`));
};

/**
 *
 * @param {*} data pid
 */
export const getAllCommentsOfPost = async data => {
	return axios
		.post('http://localhost:5000/api/posts/postcomments', data)
		.then(res => res)
		.catch(err => console.log(`Get all Comments of Post Error: ${err}`));
};
