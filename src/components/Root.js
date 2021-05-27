import React from 'react';
//import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import { Post, JobList } from './pages';

export default class Root extends React.Component {

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={JobList} />
            <Route path="/post" component={Post} />
          </div>
        </Router>
      </Provider>
    );
  }
};


