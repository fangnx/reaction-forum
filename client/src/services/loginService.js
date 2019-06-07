import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from '../actions/types';

export const loginUser = data => dispatch => {
  axios
    .post('http://localhost:5000/api/users/login', data)
    .then(res => {
      // set token to localStorage
      let { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      console.log('!~');
    })
    .catch(err => {
      console.log('Login Error!');
      console.log(err);
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
