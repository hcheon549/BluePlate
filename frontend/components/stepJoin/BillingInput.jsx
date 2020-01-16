/*
  BillingInput being used by the BillingForm
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { injectStripe, StripeProvider, Elements,
          CardNumberElement, CardExpiryElement, CardCvcElement
        } from 'react-stripe-elements';

import { clearErrors } from '../../actions/session_actions';
import { createCharge } from '../../util/charge_api_util';
import { fetchUser, updateUserName } from '../../actions/user_actions';
import { joinMembership } from '../../actions/account_summary_actions';


class BillingInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      zipCode: "",
      fname: "",
      lname: "",
      errorMessage: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateError = this.updateError.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
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
    this.setState({
      isPending: true

    })

    let {fname, lname, zipCode} = this.state;
    if (!fname || !lname || !zipCode){
      let message = this.state.errorMessage.concat(['A field cannot be blank']);
      this.setState({
        isPending: false,
        errorMessage: message
      })
    } else {
      await this.updateUserName();
      let { token } = await this.props.stripe.createToken({ name: fname + ' ' + lname, address_zip: zipCode})
      let charge = await this.props.createCharge({
        stripeEmail: this.props.currentUser.email,
        stripeToken: token.id,
        customerId: this.props.currentUser.id,
        customerName: token.card.name,
        amount: this.props.chargeAmount,
        description: this.props.currentPlan.name,
        promo: this.props.promoApplied
      })
      if (charge.errors){
        //FAILED CHARGE LOGIC
        this.setState({
          isPending: false,
          errorMessage: [charge.errors.message]
        })
      } else {
        await this.props.joinMembership({
          id: this.props.currentUser.summary_id || this.props.currentUser.summary.id,
          policy_type: "Member",
          total_meal_credits: this.props.currentPlan.meals,
          meal_credits_left: this.props.currentPlan.meals
        })
        await this.props.fetchUser(this.props.currentUser.id)
        this.setState({isPending: false})
        this.props.history.push("/my-meals")
      }
    }
  }

  async updateUserName(){
    let userData = {
      userId: this.props.currentUser.id,
      fname: this.state.fname,
      lname: this.state.lname
    }
    let oUpdate = await this.props.updateUserName(userData)

    return oUpdate
  }

  update(type, event) {
    let validationState = ["zipCode"];
    let hasError = Boolean(this.props.errors.length !== 0 || this.state.errorMessage.length !== 0)
    
    this.state[type] = validationState.includes(type) ? event.target.value.replace(/[^0-9]/g, '') : event.target.value;
    
    if (hasError) {
      this.props.clearErrors();
      this.setState({ errorMessage: [] })
    }
    this.setState({
      [type]: this.state[type]
    });
  }

  updateError({error}) {
    if(error){
      this.setState({errorMessage: this.state.errorMessage.concat(error.message)})
    } else {
      this.setState({errorMessage: []})
    }
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
    let { isPending, errorMessage } = this.state;
    let buttonText = 'Submit';

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
                onChange={this.update.bind(this, "fname")}
                className="login-input"
              />
            </div>
            <div style={{marginLeft: '10px'}}>
              <label className="billing-label">Last Name</label>
              <input
                type="text"
                autoComplete="credit_Card"
                value={this.state.lname}
                onChange={this.update.bind(this, "lname")}
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
            <div style={{width: '40%'}}>
              <label className="billing-label">Zip Code</label>
              <input
                type="text"
                autoComplete="zipCode"
                value={this.state.zipCode}
                onChange={this.update.bind(this, "zipCode")}
                className="login-input"
              />
            </div>
          </div>

          {(errorMessage && errorMessage.length > 0) && this.renderErrors()}

          <button className={"primary -fullWidth"  + (isPending ? " -pending" : "")} id="bt-submit" type="submit" disabled={isPending} >
            {!isPending && buttonText}
          </button>
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
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    joinMembership: (subscriptionData) => dispatch(joinMembership(subscriptionData)),
    clearErrors: () => dispatch(clearErrors()),
    createCharge: (data) => dispatch(createCharge(data)),
    updateUserName: (user) => dispatch(updateUserName(user))
  };
};

const BillingStipeForm = injectStripe(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillingInput)));

export default class BillingInputStripe extends React.Component{
  constructor(props){
    super(props)
  }
  // add publishable key below
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