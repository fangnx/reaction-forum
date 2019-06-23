import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
	apiKey: 'AIzaSyAUJL-HyOMpvNNQWvFwZcG6Rg3HMFPVsbM',
	authDomain: 'fangnx-rview.firebaseapp.com',
	databaseURL: 'https://fangnx-rview.firebaseio.com',
	projectId: 'fangnx-rview',
	storageBucket: 'fangnx-rview.appspot.com',
	messagingSenderId: '798177073729',
	appId: '1:798177073729:web:8f8e426a0bd83b2a'
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
