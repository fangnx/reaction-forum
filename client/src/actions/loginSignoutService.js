import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = data => dispatch => {
  axios
    .post('http://localhost:5000/api/users/login', data)
    .then(res => {
      console.log('Login Successful!');
      // Set token to localStorage
      let { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch({ type: GET_ERRORS, payload: { loginSuccess: 1 } });
    })
    .catch(err => {
      console.log('Login Error!');
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  // Remove token from localSorage
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};
