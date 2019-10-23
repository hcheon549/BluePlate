import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup, clearErrors, demo } from '../../actions/session_actions';
import { fetchSchools } from '../../actions/school_actions';


class AuthForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      enrolledSchool: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.assembleSchoolChoices = this.assembleSchoolChoices.bind(this);
  }

  componentDidMount() {
    if (this.props.formType == 'Sign-Up'){
      this.props.fetchSchools();
    }
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
    // const user = Object.assign({}, this.state);
    // this.props.processForm(user);
    console.log('HERE----------')
  }

  assembleSchoolChoices(){
    return this.props.schools.map(school => {
      return (
        <option key={school.id} value={school.name}>
          {school.name}
        </option>
      );
    })
  }

  render(){
    let { formType, buttonText, errors, schools } = this.props;
    let emailError;
    let pwError;
    let schoolError;

    errors.map((error, i) => {
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

    return(
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

          {(formType && formType == 'Sign-Up') && 
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
                {schools && this.assembleSchoolChoices()}
              </select>
            </label>
          }

          <button className="session-submit" type="submit">
            <div>{buttonText}</div>
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schools: Object.values(state.entities.schools),
    errors: state.errors.session,
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
  connect(mapStateToProps, mapDispatchToProps)(AuthForm));