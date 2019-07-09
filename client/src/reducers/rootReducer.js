/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-01 11:30:09
 * @last-modified 2019-07-09 00:33:42
 */

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authErrorReducer from './authErrorReducer';
import editPostReducer from './editPostReducer';
import subforumReducer from './subforumReducer';

export default combineReducers({
	auth: authReducer,
	errors: authErrorReducer,
	editPost: editPostReducer,
	subforum: subforumReducer
});
