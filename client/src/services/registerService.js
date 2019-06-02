import axios from 'axios';
import { GET_ERRORS } from '../actions/types';

export const registerUser = data => dispatch => {
  axios
    .post('http://localhost:5000/api/users/register', data)
    .then(res => res.status)
    .catch(err => {
      console.log('Registration Error!');
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
