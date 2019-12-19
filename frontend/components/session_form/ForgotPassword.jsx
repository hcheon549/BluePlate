import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class ForgotPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      isPending: false,
      sent: false
    }
  }
  
  update(type, event) {
    let validationState = ["email", "password"];
    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;
    this.setState({ 
      [type]: this.state[type] 
    });
  }

  
  render() {
    return (
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container loginForm animated fadeInDown">
            <div className="login-header">Forgot Password</div>

            <div className="login-subHeader">
              Enter the email address associated with your account, and we’ll email you a link to reset your password.
            </div>

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
                <button className={"primary -fullWidth" + (this.state.isPending ? " -pending" : "")} type="submit" disabled={this.state.isPending} >
                  {!this.state.isPending && 'Send Reset Instruction'}
                </button>
              </div>
            </form>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Link to="/login" className="blueLink">Log In</Link>
              &nbsp;|&nbsp;
              <Link to="/signup" className="blueLink">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
