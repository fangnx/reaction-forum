/**
 * editPostReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-21 00:39:14
 * @last-modified 2019-07-14 17:08:14
 */

import { EDIT_POST } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
	if (action.type === EDIT_POST) {
		return action.payload;
	}
	return state;
};
