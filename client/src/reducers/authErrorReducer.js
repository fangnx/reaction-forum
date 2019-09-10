/**
 * authErrorReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-01 11:27:35
 * @last-modified 2019-07-14 17:08:10
 */

import { AUTH_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
	if (action.type === AUTH_ERRORS) {
		return action.payload;
	}
	return state;
};
