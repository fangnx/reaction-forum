import axios from 'axios';
import { GET_ERRORS } from './types';

export const registerUser = data => dispatch => {
  axios
    .post('http://localhost:5000/api/users/register', data)
    .then(res => {
      console.log('Registration Successful!');
      dispatch({
        type: GET_ERRORS,
        payload: {
          registerSuccess: 1
        }
      });
    })
    .catch(err => {
      console.log('Registration Error!');
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
