import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import AuthForm from '../element/AuthForm';

class LoginPage extends React.Component {


  render() {
    return (
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container loginForm animated fadeInDown">
            <div className="login-header">WELCOME BACK</div>

            <div className="login-subHeader">
              Log in to your BluePlattr account
            </div>
            <AuthForm formType={'Login'} buttonText={'Log In'} />
            <div className="login-donthave">
              Don't have a BluePlattr account?
            </div>
            <Link to="/signup" className="blueLink">Sign Up!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
