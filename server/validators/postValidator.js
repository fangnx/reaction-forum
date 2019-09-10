/**
 * postValidator.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-09-09 13:02:15
 * @last-modified 2019-09-09 20:56:54
 */

import Validator from 'validator';
import isEmpty from 'is-empty';

export const validatePostInputs = data => {
	let errors = {};

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title cannot be empty';
	}
	if (Validator.isEmpty(data.content)) {
		errors.content = 'Content cannot be empty';
	}

	return { errors, isValid: isEmpty(errors) };
};
