import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

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

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Header />
          <HashRouter>
            <div className="content">
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
