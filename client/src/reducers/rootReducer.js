/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-01 11:30:09
 * @last-modified 2019-09-09 21:17:19
 */

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authErrorReducer from './authErrorReducer';
import postErrorReducer from './postErrorReducer';
import editPostReducer from './editPostReducer';
import subforumReducer from './subforumReducer';

export default combineReducers({
	auth: authReducer,
	errors: authErrorReducer,
	postErrors: postErrorReducer,
	editPost: editPostReducer,
	subforum: subforumReducer
});
