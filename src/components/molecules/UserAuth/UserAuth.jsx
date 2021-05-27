import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  NavItem,
  Button
} from 'reactstrap';
import { FirebaseAuth } from 'react-firebaseui';

import firebase, { auth, provider } from '../../../firebase.js';
import {
  userLogin,
  userLogout,
  checkForAuthedUser
} from '../../../actions/user';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.dispatch.checkForAuthedUser();
  }

  logout() {
    this.props.dispatch.userLogout();
  }

  login() {
    this.props.dispatch.userLogin();
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Sets the `signedIn` state property to `true` once signed in.
    callbacks: {
      signInSuccess: () => {
        this.props.dispatch.userLogin();
        return false; // Avoid redirects after sign-in.
      }
    }
  };

  renderButton() {
    return (
      <Col>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </Col>
    );
  }


  render() {
    return this.renderButton();
  }
}

const mstp = (state) => {
  const { user } = state.userStore;
  return {
    user
  };
}

// not working currently
const mdtp = (dispatch) => {
  return {
    dispatch: bindActionCreators({
      userLogin,
      userLogout,
      checkForAuthedUser
    },
    dispatch)
  }
}

export default connect(mstp, mdtp)(UserAuth);

