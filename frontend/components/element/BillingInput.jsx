/*
  BillingInput being used by the BillingForm
*/

import React from "react";
import { connect } from 'react-redux';
import { injectStripe, StripeProvider, Elements,
          CardNumberElement, CardExpiryElement, CardCvcElement
        } from 'react-stripe-elements';

import { clearErrors } from '../../actions/session_actions';
import { createCharge } from '../../util/charge_api_util';


class BillingInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      zipCode: "",
      fname: "",
      lname: "",
      errorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.updateError = this.updateError.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  createOptions() {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#222222',
          letterSpacing: '0.025em',
          fontWeight: '200',
          '::placeholder': {
            color: '#A2A2A2',
          },
        },
        invalid: {
          color: '#d8302e',
        },
      },
    };
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({isPending: true})
    let {fname, lname, zipCode} = this.state;
    let { token } = await this.props.stripe.createToken({ name: fname + ' ' + lname, address_zip: zipCode})
    if (token){
      let charge = await this.props.createCharge({
        stripeEmail: this.props.currentUser.email,
        stripeToken: token.id,
        customerId: this.props.currentUser.id,
        customerName: token.card.name,
        amount: this.props.currentPlan.price,
        description: this.props.currentPlan.name,
      })
    }
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

  updateError({error}) {
    if(error){
      this.setState({errorMessage: error.message})
    } else {
      this.setState({errorMessage: ''})
    }
  }

  render(){
    return(
      <React.Fragment>
        <div className="sectionHeader" style={{marginBottom: '10px'}}>
          <h5 style={{margin: '10px 0'}}>Your Billing Information</h5>
        </div>

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
            <CardNumberElement
              {...this.createOptions()}
              className="stripe-input"
              onChange={this.updateError}
            />
          </div>

          <div className="billing-form -flex">
            <div style={{marginRight: '10px', width: '30%'}}>
              <label className="billing-label">Exp. (MM/YY)</label>
              <CardExpiryElement
                {...this.createOptions()}
                className="stripe-input"
                onChange={this.updateError}
              />
            </div>
            <div style={{marginRight: '10px', width: '40%'}}>
              <label className="billing-label">CVC</label>
              <CardCvcElement
                {...this.createOptions()}
                className="stripe-input"
                onChange={this.updateError}
              />
            </div>
            <div>
              <label className="billing-label">Zip Code</label>
              <input
                type="text"
                autoComplete="zipCode"
                value={this.state.zipCode}
                onChange={this.update("zipCode")}
                className="login-input"
              />
            </div>
          </div>

          {this.state.errorMessage && <div className="error" role="alert">
            {this.state.errorMessage}
          </div>}

          <button className={"primary -fullWidth"} id="bt-submit" type="submit">Submit</button>
        </form>
      </React.Fragment>
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
    clearErrors: () => dispatch(clearErrors()),
    createCharge: (data) => dispatch(createCharge(data))
  };
};

const BillingStipeForm = injectStripe(connect(mapStateToProps, mapDispatchToProps)(BillingInput));

export default class BillingInputStripe extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <StripeProvider apiKey="pk_test_oTMfaCSNQoyemWfMsr898SS4008zqZTALW">
        <Elements>
          <BillingStipeForm {...this.props} />
        </Elements>
      </StripeProvider>
    )
  } 
}