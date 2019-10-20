import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login, clearErrors, demo } from '../../actions/session_actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container animated fadeInUp">
            <div className="login-welcome">WELCOME BACK</div>

            <div className="login-to-account">
              Log in to your BluePlate account
            </div>

            <form onSubmit={this.handleSubmit} className="login-form-box">
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
            </form>
            <div className="login-donthave">
              Don't have a BluePlate account? <Link to="/signup" className="blueLink">Sign Up!</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'LOG IN',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    demo: () => dispatch(demo()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
