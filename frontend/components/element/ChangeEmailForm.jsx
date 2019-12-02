/*
  ChangeEmailForm being used by the Subscription Summary
*/

import React from "react";

class ChangeEmailForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      emailUpdated: false,
      isPending: false,
      email: this.props.currentUser.email,
      errorMessage: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isPending: true })
    let oUpdate = await this.updateUserEmail();
    if (oUpdate.user){
      this.setState({
        emailUpdated: true
      })
      setTimeout(() => {
        this.props.toggleUpdateForm();
      }, 3000);
    } else {
      this.setState({
        errorMessage: oUpdate.errors
      })
    }
    this.setState({isPending: false})
  }

  async updateUserEmail(){
    const userData = {
      userId: this.props.currentUser.id,
      email: this.state.email
    }
    let oUpdate = this.props.updateUserEmail(userData)
    return oUpdate
  }

  update(type, event) {
    let validationState = ["email"];
    let hasErrors = Boolean(this.props.errors.length !== 0 || this.state.errorMessage.length !== 0)

    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;

    if (hasErrors) {
      this.props.clearErrors();
      this.setState({ errorMessage: [] })
    }
    this.setState({ [type]: this.state[type] });
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
    let { isPending, errorMessage, emailUpdated } = this.state;
    let buttonText = emailUpdated ? 'Updated!' : 'Update';

    return(
      <form onSubmit={this.handleSubmit} className="login-form-box">
        <div className="updateEmail-form">
          <label className="login-label">
            <input
              type="text"
              autoComplete="email"
              value={this.state.email}
              onChange={this.update.bind(this, "email")}
              className="login-input"
            />
          </label>


          <button className={"secondary"} type="submit" disabled={emailUpdated || isPending} >
            {buttonText}
          </button>
        </div>
        {(errorMessage && errorMessage.length > 0) && this.renderErrors()}
      </form>
    )
  }
}

export default ChangeEmailForm;