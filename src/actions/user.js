import firebase, { auth, provider } from '../firebase.js';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload
  };
}

const userLoginFail = (payload) => {
  return {
    type: USER_LOGIN_FAIL,
    payload
  };
}

const userLogoutSuccess = (payload) => {
  return {
    type: USER_LOGOUT,
    payload
  }
}

export function checkForAuthedUser() {
  return dispatch => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return dispatch(userLoginSuccess({user}));
      }
    });
  }
}

export function userLogin() {
  return dispatch => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`/stripe_customers/${user.uid}/customer_id`).on('value', snapshot => {
          return dispatch(userLoginSuccess({user}));
        }, () => {
          console.log('something failed');
        });
      }
      dispatch(userLoginFail({error: true, message: 'Failed to login'}));
    });
  };
}

export function userLogout() {
  return dispatch => {
    auth.signOut()
    .then(() => {
      dispatch(userLogoutSuccess({user: null}));
    });
  };
}


  //firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).on('value', snapshot => {
    //this.sources = snapshot.val();
  //}, () => {
    //this.sources = {};
  //});

  //firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/charges`).on('value', snapshot => {
    //this.charges = snapshot.val();
  //}, () => {
    //this.charges = {};
  //});
