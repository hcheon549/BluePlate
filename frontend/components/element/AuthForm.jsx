/*
  AuthForm being used by the SignUpPage and Loginpage
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { createAccount, clearErrors, login } from '../../actions/session_actions';
import { createAccountSummary } from '../../actions/account_summary_actions'
import { fetchUser } from '../../actions/user_actions';


class AuthForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      email: "",
      password: "",
      school_id: "",
      rememberMe: false,
      errorMessage: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.assembleSchoolChoices = this.assembleSchoolChoices.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }


  componentWillUnmount() {
    this.props.clearErrors();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({isPending: true})
    
    const user = Object.assign({}, { 
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      school_id: this.state.school_id
    });

    if (this.props.formType == 'Login'){ //LOG IN LOGIC
      let loggedinUser = await this.props.processLogIn(user);
      if (loggedinUser.user){
        let nextPath = loggedinUser.user.policyType == 'Member' ? '/my-meals' : '/signup'
        this.props.history.push(nextPath)
      } else {
        this.setState({
          isPending: false,
          errorMessage: loggedinUser.errors
        })
      }
    } else if (this.props.formType == 'Sign-Up'){ //SIGN UP LOGIC
      let res = await this.props.processJoinForm(user);
      if (res.user && this.props.setStep){
        await this.props.createAccountSummary(res.user.id);
        await this.props.fetchUser(res.user.id);
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
    let hasErrors = Boolean(this.props.errors.length !== 0 || this.state.errorMessage.length !== 0)

    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;
    
    if (hasErrors) {
      this.props.clearErrors();
      this.setState({ errorMessage: [] })
    }
    this.setState({ [type]: this.state[type] });
  }

  assembleSchoolChoices(){
    return this.props.schools.map(school => {
      return (
        <option key={school.id} value={school.id}>
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

          {(formType && formType == 'Login') &&  
          <label className="auth-options">
            <div className="remember-checkbox">
              <input
                className="remember-input"
                name="rememberMe"
                type="checkbox"
                checked={this.state.remeberMe}
                onChange={this.update.bind(this, "rememberMe")}
              />
              <div className="remember-label">REMEMBER ME</div>
            </div>
            <Link className="forgot-password" to="/forgot-password">
              Forgot Password?
            </Link>
          </label>
          }

          {(formType && formType == 'Sign-Up') && 
            <label className="login-label">CAMPUS:
              <select
                value={this.state.school_id}
                onChange={this.update.bind(this, "school_id")}
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
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    processJoinForm: (user) => dispatch(createAccount(user)),
    processLogIn: (user) => dispatch(login(user)),
    createAccountSummary: (userId) => dispatch(createAccountSummary(userId)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));