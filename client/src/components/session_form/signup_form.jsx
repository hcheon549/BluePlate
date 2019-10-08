import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { signup, clearErrors, demo } from '../../actions/session_actions';
import { fetchSchools } from '../../actions/school_actions';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      enrolledSchool: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSchools();
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

  render() {
    let emailError;
    let pwError;
    let schoolError;

    this.props.errors.map((error, i) => {
      if (error.toLowerCase().includes("email")) {
        emailError = (
          <div className="signup-errors" key={`error-${i}`}>
            {error}
          </div>
        );
      } else if (error.toLowerCase().includes("password")) {
        pwError = (
          <div className="signup-errors" key={`error-${i}`}>
            {error}
          </div>
        );
      } else if (error.toLowerCase().includes("school")) {
        schoolError = (
          <div className="signup-errors" key={`error-${i}`}>
            {error}
          </div>
        );
      }
      return null;
    });

    return (
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container animated fadeInUp">
            <div className="login-welcome">MEAL LESS THAN $6</div>

            <div className="login-to-account">Sign up to BluePlate</div>

            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-form">
                <label className="login-label">
                  <ul className="label-err">
                    <li>EMAIL ADDRESS:</li>
                    <li className="session-error">{emailError}</li>
                  </ul>
                  <input
                    type="text"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.update("email")}
                    className="login-input"
                  />
                </label>

                <label className="login-label">
                  <ul className="label-err">
                    <li>PASSWORD:</li>
                    <li className="session-error">{pwError}</li>
                  </ul>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.update("password")}
                    className="login-input"
                  />
                </label>

                <label className="login-label">
                  <ul className="label-err">
                    <li>LOCATION:</li>
                    <li className="session-error">{schoolError}</li>
                  </ul>
                  <select
                    value={this.state.enrolledSchool}
                    onChange={this.update("enrolledSchool")}
                    autoComplete="foo"
                  >
                    <option hidden value={null}>
                      -- Please Select --
                    </option>

                    {this.props.schools.map(school => {
                      return (
                        <option key={school.id} value={school.name}>
                          {school.name}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <button className="session-submit" type="submit">
                  <div>{this.props.formType}</div>
                </button>
              </div>
            </form>
            <div className="login-donthave">
              Already have a BluePlate account?
            </div>
            <div className="other-link">
              <li>{this.props.navLink}</li>
              <li className="sign-up-separator" />
              <li>
                <div onClick={() => this.props.demo()}>Demo!</div>
              </li>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: Object.values(state.entities.schools),
    errors: state.errors.session,
    formType: 'SIGN UP',
    navLink: <Link to="/login">Log In!</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    demo: () => dispatch(demo()),
    fetchSchools: () => dispatch(fetchSchools()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignupForm));