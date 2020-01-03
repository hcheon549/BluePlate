import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { resetUserPassword } from '../../actions/password_reset_actions'

class ResetPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      password: "",
      confirmPassword: "",
      isPending: false,
      reset: false,
      message: ""
    }
    this.password_reset_token = this.props.history.location.search.slice(1, this.props.history.location.search.length)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  update(type, event) {
    let validationState = ["confirmPassword", "password"];
    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;
    if(this.state.message.length > 0){
      this.setState({
        message: ""
      })
    }
    this.setState({ 
      [type]: this.state[type] 
    });
  }

  async handleSubmit(e){
    e.preventDefault();

    if (this.state.confirmPassword != this.state.password){
      this.setState({
        message: "Confirmation password must be identical."
      })

      return null
    }

    this.setState({
      isPending: true
    })

    let resetData = {
      newPassword: this.state.confirmPassword,
      password_reset_token: this.password_reset_token
    }

    let response = await this.props.resetUserPassword(resetData)

    if (response.response){
      this.setState({
        isPending: false,
        reset: true,
        password: "",
        confirmPassword: ""
      })
      setTimeout(() => {
        window.location.replace('/login')
      }, 4000)
    } else {
      this.setState({
        isPending: false,
        password: "",
        confirmPassword: "",
        message: response.error.message
      })
    }
  }
  
  render() {
    let buttonText = this.state.reset ? 'Password has been reset!' : 'Reset Password'

    return (
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container loginForm animated fadeInDown">
            <div className="login-header">Reset Password</div>

            <div className="login-subHeader">
              Enter a new password.
            </div>

            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-form">
                <label className="login-label">PASSWORD:
                  <input
                    type="password"
                    autoComplete="email"
                    value={this.state.password}
                    onChange={this.update.bind(this, "password")}
                    className="login-input"
                  />
                </label>
                <label className="login-label">CONFIRM PASSWORD:
                  <input
                    type="password"
                    autoComplete="email"
                    value={this.state.confirmPassword}
                    onChange={this.update.bind(this, "confirmPassword")}
                    className="login-input"
                  />
                </label>

                {this.state.message && <div className="error" role="alert">
                  {this.state.message}
                </div>}

                <button className={"primary -fullWidth" + (this.state.isPending ? " -pending" : "")} type="submit" disabled={this.state.isPending} >
                  {!this.state.isPending && buttonText}
                </button>
              </div>
            </form>
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
    resetUserPassword: (data) => dispatch(resetUserPassword(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));
