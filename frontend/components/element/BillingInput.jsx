/*
  AuthForm being used by the SignUpPage and Loginpage
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup, clearErrors, login } from '../../actions/session_actions';
import { fetchSchools } from '../../actions/school_actions';


class BillingInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      card_number: "",
      card_code: "",
      expiration: "",
      zipCode: "",
      fname: "",
      lname: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({isPending: true})
    const payment_method = Object.assign({}, this.state);
    console.log(payment_method);
  }

  update(type) {
    return e => {
      if (this.props.errors){
        this.props.clearErrors();
      }
      this.setState({
        [type]: e.currentTarget.value
      }); 
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render(){
    return(
      <form className="billing-form-box" onSubmit={this.handleSubmit}>

        <div className="billing-form -flex">
          <div style={{marginRight: '10px'}}>
            <label className="billing-label">First Name</label>
            <input
              type="text"
              autoComplete="credit_Card"
              value={this.state.fname}
              onChange={this.update("fname")}
              className="login-input"
            />
          </div>
          <div style={{marginLeft: '10px'}}>
            <label className="billing-label">Last Name</label>
            <input
              type="text"
              autoComplete="credit_Card"
              value={this.state.lname}
              onChange={this.update("lname")}
              className="login-input"
            />
          </div>
        </div>

        <div className="billing-form">
          <label className="billing-label">Credit card no.</label>
          <input
            type="text"
            autoComplete="credit_Card"
            value={this.state.card_number}
            onChange={this.update("card_number")}
            className="login-input"
          />
        </div>

        <div className="billing-form -flex">
          <div style={{marginRight: '10px', width: '30%'}}>
            <label className="billing-label">Exp. (MM/YY)</label>
            <input
              type="text"
              autoComplete="expiration"
              value={this.state.expiration}
              onChange={this.update("expiration")}
              className="login-input"
            />
          </div>
          <div style={{marginRight: '10px', width: '40%'}}>
            <label className="billing-label">CVV</label>
            <input
              type="text"
              autoComplete="cvv"
              value={this.state.card_code}
              onChange={this.update("card_code")}
              className="login-input"
            />
          </div>
          <div>
            <label className="billing-label">Zip</label>
            <input
              type="text"
              autoComplete="zipCode"
              value={this.state.zipCode}
              onChange={this.update("zipCode")}
              className="login-input"
            />
          </div>
        </div>

        <button className={"primary -fullWidth"} id="bt-submit" type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingInput));