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

import Header from './components/Header';
import PostBoard from './components/PostBoard';
import UserPostBoard from './components/UserPostBoard';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Registration from './components/Registration';
import Login from './components/Login';
import { setCurrentUser, logoutUser } from './actions/loginSignoutActions';

// const { store, persistor } = configureStore();

// Check if logged in
if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));
	// console.log('is logged in');

	// Check if token has expired
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = './login';
	}
}
console.log(store.getState());

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
								<Route path="/registration" component={Registration} />
								<Route path="/login" component={Login} />
								<Route path="/post/add" component={AddPost} />
								<Route path="/post/edit" component={EditPost} />
								<Route path="/myposts" component={UserPostBoard} />
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
