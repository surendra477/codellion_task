import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../actions/user';

const initialState = {
  user: null,
  isLoaded: true,
  error: false,
  message: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {isLoaded: false});
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoaded: true,
        user: action.payload.user
      });
    case USER_LOGIN_FAIL:
      return Object.assign({}, state, {
        isLoaded: true,
        error: true,
        message: action.payload.message
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        user: null
      });
    default:
      return state
  }
}

export default userReducer;
