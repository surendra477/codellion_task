import { combineReducers } from 'redux';

import { firebaseReducer } from 'react-redux-firebase';

import userReducer from './userReducer';
import jobsReducer from './jobsReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  jobsStore: jobsReducer,
  userStore: userReducer
});

export default rootReducer;
