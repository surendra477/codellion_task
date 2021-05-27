import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';

import firebase from '../firebase';
import rootReducer from '../reducers';

export default function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase,
      {
        userProfile: 'users',
        enableLogging: false
      }
    ),
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
//export default store;
