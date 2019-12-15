/*
  LeadCaptureForm being used by the EmailCapture Modal
*/

import React from "react";
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

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
      errorMessage: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.tractAction = this.tractAction.bind(this);
  }

  resetForm() {
    this.setState({
      submitted: false,
      email: '',
      campus: '',
      wishlist: '',
      errorMessage: []
    })
  }

  tractAction(){
    ReactGA.event({
      category: 'Lead',
      action: 'Lead Captured'
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isPending: true })

    this.tractAction();

    let leadData = {
      email: this.state.email,
      campus: this.state.campus,
      wishlist: this.state.wishlist
    }
    let leadReceived = await this.props.createLeadCapture(leadData);

    if (leadReceived.lead){
      this.setState({submitted: true})
      this.props.landing ? setTimeout(this.resetForm, 2500) : setTimeout(this.props.closeModal, 1500)
    } else {
      this.setState({errorMessage: leadReceived.errors})
    }
    this.setState({isPending: false})
  }

  update(type, event) {
    let validationState = ["email"];
    let hasErrors = Boolean(this.props.errors.length !== 0 || this.state.errorMessage.length !== 0)

    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;

    if (hasErrors) {
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
      <form onSubmit={this.handleSubmit} className="emailCapture-box">
        <div className="leadCapture-form">
        <label className="login-label">Email Address
          <input
            type="text"
            autoComplete="email"
            onChange={this.update.bind(this, "email")}
            className="login-input"
            value={this.state.email}
          />
        </label>

        <label className="login-label">List Your Wishlist Restaurants
          <input
            type="text"
            autoComplete="wishlist"
            onChange={this.update.bind(this, "wishlist")}
            className="login-input"
            value={this.state.wishlist}
          />
        </label>


          <button className={this.props.style + " -fullWidth" + (isPending ? " -pending" : "")} type="submit" disabled={!email || isPending} >
            {!isPending && buttonText}
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