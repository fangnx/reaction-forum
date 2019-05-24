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
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.passwordRe)) {
    errors.passwordRe = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.passwordRe)) {
    errors.passwordRe = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
