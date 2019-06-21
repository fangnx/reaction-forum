import { AUTH_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
	if (action.type === AUTH_ERRORS) {
		return action.payload;
	}
	return state;
};
