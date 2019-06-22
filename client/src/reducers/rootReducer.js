import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authErrorReducer from './authErrorReducer';
import editPostReducer from './editPostReducer';

export default combineReducers({
	auth: authReducer,
	errors: authErrorReducer,
	editPost: editPostReducer
});
