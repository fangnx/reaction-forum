import axios from 'axios';

export const addPost = data => {
  return axios
    .post('http://localhost:5000/api/posts/add', data)
    .then(res => res)
    .catch(err => console.log(`Add Post Error: ${err}`));
};

export const getAllPosts = () => {
  axios
    .post('http://localhost:5000/api/posts/findAll')
    .then(res => res)
    .catch(err => console.log(`Get all Posts Error: ${err}`));
};
