/**
 * rssSourceActions.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-04 20:25:48
 * @last-modified 2019-07-04 21:16:29
 */

import axios from 'axios';

export const subscribeToSource = async data => {
	return axios
		.post('/api/sources/subscribe', data)
		.then(res => res)
		.catch(err => console.log(`Add RSS Source Error: ${err}`));
};
