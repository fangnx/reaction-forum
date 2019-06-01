import axios from 'axios';
import bcrypt from 'bcryptjs';

export const registerUser = data => {
  return axios
    .post('http://localhost:5000/api/users/register', data)
    .then(res => res.status);
};
