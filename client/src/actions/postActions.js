/**
 * postActions.js
 *
 * @author fangnx
 * @description
 * @created 2019-06-11T23:59:00.196Z-04:00
 * @last-modified 2019-06-23T23:47:00.794Z-04:00
 */

import axios from 'axios';
import { POST_ERRORS } from './actionTypes';

export const addPost = data => dispatch => {
	return axios
		.post('/api/posts/add', data)
		.then(() => {
			dispatch({
				type: POST_ERRORS,
				payload: {
					success: true
				}
			});
		})
		.catch(err => {
			dispatch({
				type: POST_ERRORS,
				payload: err.response.data
			});
		});
};

export const deletePost = async data => {
	return axios.post('/api/posts/delete', data).then(res => res);
};

export const editPost = data => dispatch => {
	return axios
		.post('/api/posts/edit', data)
		.then(() => {
			dispatch({
				type: POST_ERRORS,
				payload: {
					success: true
				}
			});
		})
		.catch(err => {
			dispatch({
				type: POST_ERRORS,
				payload: err.response.data
			});
		});
};

export const getAllPosts = async () => {
	return axios
		.post('/api/posts/findAll')
		.then(res => res)
		.catch(err => err);
};

export const getAllPostsOfUser = async data => {
	return axios
		.post('/api/posts/userposts', data)
		.then(res => res)
		.catch(err => err);
};

export const addComment = async data => {
	return axios
		.post('/api/posts/addComment', data)
		.then(res => res)
		.catch(err => err);
};

export const getAllCommentsOfPost = async data => {
	return axios
		.post('/api/posts/postcomments', data)
		.then(res => res)
		.catch(err => err);
};
