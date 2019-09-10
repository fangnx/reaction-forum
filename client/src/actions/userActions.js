/**
 * userActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-02 16:22:08
 * @last-modified 2019-09-09 20:54:13
 */

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { AUTH_ERRORS, SET_CURRENT_USER } from './actionTypes';

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const registerUser = data => dispatch => {
	axios
		.post('/api/users/register', data)
		.then(res => {
			dispatch({
				type: AUTH_ERRORS,
				payload: {
					registerSuccess: 1
				}
			});
		})
		.catch(err => {
			dispatch({
				type: AUTH_ERRORS,
				payload: err.response.data
			});
		});
};

export const loginUser = data => dispatch => {
	axios
		.post('/api/users/login', data)
		.then(res => {
			// Set token to localStorage.
			let { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwtDecode(token);
			// Set current user.
			dispatch(setCurrentUser(decoded));
			dispatch({ type: AUTH_ERRORS, payload: { loginSuccess: 1 } });
		})
		.catch(err => {
			dispatch({
				type: AUTH_ERRORS,
				payload: err.response.data
			});
		});
};

export const logoutUser = () => dispatch => {
	// Remove token from localStorage.
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	// Remove current user.
	dispatch(setCurrentUser({}));
	dispatch({
		type: AUTH_ERRORS,
		payload: {}
	});
};

export const getAvatarData = async data => {
	return axios
		.post('/api/users/avatarimagedata', data)
		.then(res => res)
		.catch(err => console.log(err));
};
