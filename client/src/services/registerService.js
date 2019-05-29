import axios from 'axios';
import bcrypt from 'bcryptjs';

// axios.defaults.baseURL = 'http://localhost:5000';
export const registerUser = data => {
  return axios
    .post('http://localhost:5000/api/users/register', data)
    .then(console.log('Registration successful!'));
};
