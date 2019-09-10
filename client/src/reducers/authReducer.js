/**
 * authReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-01 11:22:34
 * @last-modified 2019-07-14 17:08:06
 */

import { SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from 'is-empty';

const initialState = {
	isAuthenticated: false,
	user: {}
};

export default (state = initialState, action) => {
	if (action.type === SET_CURRENT_USER) {
		return {
			...state,
			isAuthenticated: !isEmpty(action.payload),
			user: action.payload
		};
	}
	return state;
};
