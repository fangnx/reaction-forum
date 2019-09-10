/**
 * login.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-05-23 21:08:29
 * @last-modified 2019-09-09 13:35:38
 */

import Validator from 'validator';
import isEmpty from 'is-empty';

// Login with email & password
export const validateLoginInputs = data => {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
