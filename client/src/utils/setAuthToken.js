/**
 * setAuthToken.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-09-10 13:10:06
 * @last-modified 2019-09-10 16:18:39
 */

import axios from 'axios';
const setAuthToken = token => {
	if (token) {
		// If logged in
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};
export default setAuthToken;
