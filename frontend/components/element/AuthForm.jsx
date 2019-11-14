/*
  AuthForm being used by the SignUpPage and Loginpage
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createAccount, clearErrors, login } from '../../actions/session_actions';
import { createAccountSummary } from '../../actions/account_summary_actions'
import { fetchSchools } from '../../actions/school_actions';


class AuthForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      email: "",
      password: "",
      enrolledSchool: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.assembleSchoolChoices = this.assembleSchoolChoices.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.formType == 'Sign-Up'){
      this.props.fetchSchools();
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({isPending: true})
    const user = Object.assign({}, this.state);
    if (this.props.formType == 'Login'){
      this.props.processLogIn(user);
    } else if (this.props.formType == 'Sign-Up'){
      let res = await this.props.processJoinForm(user);
      if (res.user && this.props.setStep){
        let summary = await this.props.createAccountSummary(res.user.id)
        this.props.setStep('plan');
      } else if (res.errors){
        this.setState({
          isPending: false,
          errorMessage: res.errors
        })
      }
    }
  }

  update(type, event) {
    let validationState = ["email", "password"];
    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;
    if (this.props.errors || this.state.errorMessage) {
      this.props.clearErrors();
      this.setState({ errorMessage: [] })
    }
    this.setState({ [type]: this.state[type] });
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

  renderErrors() {
    return (
      <ul className="error" role="alert">
        {this.state.errorMessage.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    );
  }

  render(){
    let { formType, buttonText, errors, schools } = this.props,
        { isPending, errorMessage } = this.state;

    return(
      <form onSubmit={this.handleSubmit} className="login-form-box">
        <div className="login-form">
          <label className="login-label">EMAIL ADDRESS:
            <input
              type="text"
              autoComplete="email"
              value={this.state.email}
              onChange={this.update.bind(this, "email")}
              className="login-input"
            />
          </label>

          <label className="login-label">PASSWORD:
            <input
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.update.bind(this, "password")}
              className="login-input"
            />
          </label>

          {(formType && formType == 'Sign-Up') && 
            <label className="login-label">CAMPUS:
              <select
                value={this.state.enrolledSchool}
                onChange={this.update.bind(this, "enrolledSchool")}
                autoComplete="foo"
              >
                <option hidden value={null}>
                  -- Please Select --
                </option>
                {schools && this.assembleSchoolChoices()}
              </select>
            </label>
          }

          {(errorMessage && errorMessage.length > 0) && this.renderErrors()}

          <button className={"primary -fullWidth" + (isPending ? " -pending" : "")} type="submit" disabled={isPending} >
            {!isPending && buttonText}
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
    processJoinForm: (user) => dispatch(createAccount(user)),
    processLogIn: (user) => dispatch(login(user)),
    createAccountSummary: (userId) => dispatch(createAccountSummary(userId)),
    fetchSchools: () => dispatch(fetchSchools()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthForm));