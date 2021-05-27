import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
