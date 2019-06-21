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
