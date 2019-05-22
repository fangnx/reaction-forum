import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'; // add icons individually
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import Registration from './components/Registration';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HashRouter>
          <div className="content">
            <Route path="/" exact component={Post} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Header} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

// Font Awesome 5
library.add(fab, faThumbsUp);

// Semantic UI
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

export default App;
