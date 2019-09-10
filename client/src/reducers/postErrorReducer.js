/**
 * postErrorReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-09-09 21:15:11
 * @last-modified 2019-09-09 21:16:34
 */

import { POST_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
	if (action.type === POST_ERRORS) {
		return action.payload;
	}
	return state;
};
