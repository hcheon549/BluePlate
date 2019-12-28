import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { updateUserPassword } from '../../actions/password_reset_actions'

class ForgotPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      isPending: false,
      sent: false,
      message: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  update(type, event) {
    let validationState = ["email", "password"];
    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;
    this.setState({ 
      [type]: this.state[type] 
    });
  }

  async handleSubmit(){
    this.setState({
      isPending: true
    })

    let userEmail = this.state.email

    let response = await this.props.updateUserPassword(userEmail)
    debugger
    if (response){
      this.setState({
        sent: true,
        email: "",
        message: response
      })
    } else {
      this.setState({
        email: "",
        message: response
      })
    }

    this.setState({
      isPending: false
    })

  }
  
  render() {
    let buttonText = this.state.sent ? 'Instruction Sent!' : 'Send Reset Instruction'

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
                  {!this.state.isPending && buttonText}
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

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserPassword: (email) => dispatch(updateUserPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
