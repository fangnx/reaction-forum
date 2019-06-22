import { EDIT_POST } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
	if (action.type === EDIT_POST) {
		return action.payload;
	}
	return state;
};
