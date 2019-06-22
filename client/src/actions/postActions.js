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

export const getAllPostsOfUser = async userEmail => {
	return axios
		.post(`http://localhost:5000/api/posts/userposts`, userEmail)
		.then(res => res)
		.catch(err => console.log(`Get all Posts of User Error: ${err}`));
};
