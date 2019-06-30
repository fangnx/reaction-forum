/**
 * registerActions.js
 * @author fangnx
 * @description
 * @created 2019-05-28T22:52:56.069Z-04:00
 * @copyright
 * @last-modified 2019-06-23T17:40:31.435Z-04:00
 */

import axios from 'axios';
import { AUTH_ERRORS } from './actionTypes';

export const registerUser = data => dispatch => {
	axios
		.post('http://localhost:5000/api/users/register', data)
		.then(value => {
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
