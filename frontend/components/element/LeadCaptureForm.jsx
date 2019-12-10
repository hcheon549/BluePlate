/*
  LeadCaptureForm being used by the EmailCapture Modal
*/

import React from "react";
import { connect } from 'react-redux';

import { createLeadCapture } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';

class LeadCaptureForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      email: '',
      campus: '',
      wishlist: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isPending: true })

    let leadData = {
      email: this.state.email,
      campus: this.state.campus,
      wishlist: this.state.wishlist
    }
    let leadData = await this.createLeadCapture(leadData);
    if (leadData.lead){
      // lead captured logic
      this.setState({
        submitted: true
      })
      setTimeout(this.props.closeModal, 1500)
    } else {
      this.setState({
        errorMessage: leadData.errors
      })
    }
    this.setState({isPending: false})
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
    let { email, isPending, errorMessage, submitted } = this.state;
    let buttonText = submitted ? 'Success!' : 'Submit'

    return(
      <form onSubmit={this.handleSubmit} className="login-form-box">
        <div className="leadCapture-form">
        <label className="login-label">EMAIL ADDRESS:
          <input
            type="text"
            autoComplete="email"
            onChange={this.update.bind(this, "email")}
            className="login-input"
          />
        </label>

        <label className="login-label">List all restaurants you would like to see in BluePlattr:
          <input
            type="text"
            autoComplete="wishlist"
            onChange={this.update.bind(this, "wishlist")}
            className="login-input"
          />
        </label>


          <button className={"secondary"} type="submit" disabled={!email || isPending} >
            {buttonText}
          </button>
        </div>
        {(errorMessage && errorMessage.length > 0) && this.renderErrors()}
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    leadCapture: state.ui.leadCapture,
    errors: state.ui.leadCapture.errors
  };
};

const mapDispatchToProps = (dispatch) => {
 return {
    createLeadCapture: (leadData) => dispatch(createLeadCapture(leadData)),
    closeModal: () => dispatch(closeModal()),
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadCaptureForm);