import axios from 'axios';

export const addPost = data => {
  axios
    .post('http://localhost:5000/api/posts/add', data)
    .then(res => {
      console.log('Add Post Successful!');
    })
    .catch(err => console.log(`Add Post Error: ${err}`));
};
