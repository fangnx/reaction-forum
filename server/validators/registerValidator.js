/**
 * register.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-05-16 23:39:47
 * @last-modified 2019-09-09 13:02:23
 */

import Validator from 'validator';
import isEmpty from 'is-empty';

export const validateRegisterInputs = data => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.passwordRe = !isEmpty(data.passwordRe) ? data.passwordRe : '';
	// data.gender = !isEmpty(data.gender) ? data.gender : ''; // may not be necessary

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Please enter your name';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Please enter your email';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Invalid email format (Valid: xxx@yyy.com)';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Please enter a password';
	}

	if (Validator.isEmpty(data.passwordRe)) {
		errors.passwordRe = 'Please confirm the password';
	}

	if (!Validator.equals(data.password, data.passwordRe)) {
		errors.passwordRe = 'Passwords do not match :(';
	}

	if (Validator.isEmpty(data.gender)) {
		errors.gender = 'Please select the gender';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
