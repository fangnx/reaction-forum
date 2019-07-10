/**
 * App.js
 * @author fangnx
 * @description
 * @created 2019-05-02T15:59:50.167Z-04:00
 * @copyright
 * @last-modified 2019-06-23T21:09:58.422Z-04:00
 */

import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';
import { persistor } from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import './semantic/dist/semantic.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faWater, faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import Header from './components/Header/Header';
import Forum from './components/Forum/Forum';
import SubforumBoard from './components/Forum/SubforumBoard';
import PostBoard from './components/PostBoard/PostBoard';
import UserPostBoard from './components/PostBoard/UserPostBoard';
import AddPost from './components/AddPost/AddPost';
import EditPost from './components/EditPost/EditPost';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Subscribe from './components/Subscribe/Subscribe';
import { setCurrentUser, logoutUser } from './actions/userActions';

// const { store, persistor } = configureStore();

// Check if logged in
if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));

	// Check if token has expired
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = './login';
	}
}
// console.log(store.getState());

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<div className="app-background" />
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<div className="app-fixed">
							<Header />
						</div>
						<HashRouter>
							<div className="app-content">
								<Route path="/" exact component={PostBoard} />
								<Route path="/forum" exact component={Forum} />
								<Route path="/subforum/*" component={SubforumBoard} />
								<Route path="/register" component={Register} />
								<Route path="/login" component={Login} />
								<Route path="/post/add" component={AddPost} />
								<Route path="/post/edit" component={EditPost} />
								<Route path="/myposts" component={UserPostBoard} />
								<Route path="/subscribe" component={Subscribe} />
							</div>
						</HashRouter>
					</PersistGate>
				</Provider>
			</div>
		);
	}
}

// Font Awesome 5
library.add(fab, faThumbsUp, faCheck, faWater, faPlus);

export default App;
