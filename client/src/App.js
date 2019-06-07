import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './services/loginService';

import './semantic/dist/semantic.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import Header from './components/Header';
import Post from './components/Post';
import Registration from './components/Registration';
import Login from './components/Login';

// check user login status
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check if token has expired
  // const currentTime = Date.now() / 1000; // to get in milliseconds
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  //   // Redirect to login
  //   window.location.href = './login';
  // }
}
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Header />
          <HashRouter>
            <div className="app-content">
              <Route path="/" exact component={Post} />
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </div>
          </HashRouter>
        </Provider>
      </div>
    );
  }
}

// Font Awesome 5
library.add(fab, faThumbsUp, faCheck);

export default App;
