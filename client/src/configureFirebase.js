/**
 * configureFirebase.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-09-10 13:10:06
 * @last-modified 2019-09-21 02:11:56
 */

import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default };
