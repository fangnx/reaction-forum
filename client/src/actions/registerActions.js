import axios from 'axios';
import { AUTH_ERRORS } from './actionTypes';

export const registerUser = data => dispatch => {
	axios
		.post('http://localhost:5000/api/users/register', data)
		.then(
			dispatch({
				type: AUTH_ERRORS,
				payload: {
					registerSuccess: 1
				}
			})
		)
		.catch(err => {
			dispatch({
				type: AUTH_ERRORS,
				payload: err.response.data
			});
		});
};
