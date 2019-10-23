import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login, clearErrors, demo } from '../../actions/session_actions';

import AuthForm from '../element/AuthForm';

class LoginPage extends React.Component {


  render() {
    return (
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container loginForm animated fadeInUp">
            <div className="login-welcome">WELCOME BACK</div>

            <div className="login-to-account">
              Log in to your BluePlate account
            </div>
            <AuthForm formType={'Login'} buttonText={'Log In'} />
            {/* <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-errors">{this.renderErrors()}</div>

              <div className="login-form">
                <label className="login-label">
                  EMAIL ADDRESS:
                  <input
                    type="text"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.update("email")}
                    className="login-input"
                  />
                </label>

                <label className="login-label">
                  PASSWORD:
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.update("password")}
                    className="login-input"
                  />
                </label>

                <button className="session-submit" type="submit">
                  <div>{this.props.formType}</div>
                </button>
              </div>
            </form> */}
            <div className="login-donthave">
              Don't have a BluePlate account?
            </div>
            <Link to="/users/signup" className="blueLink">Sign Up!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
