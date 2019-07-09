/**
 * subforumReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-09 00:25:41
 * @last-modified 2019-07-09 00:26:42
 */

import { SUBFORUM } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
	if (action.type === SUBFORUM) {
		return action.payload;
	}
	return state;
};
