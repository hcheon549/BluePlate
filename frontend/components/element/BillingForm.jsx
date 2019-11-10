/*
  BillingForm
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clearErrors } from '../../actions/session_actions';

import SubscriptionSummary from './SubscriptionSummary'


class BillingForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      card_number: "",
      card_code: "",
      expiration: "",
      zipCode: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  calculatePayment(total){
    let payment = Math.round((total / 3) * 100) / 100;
    let payments = [];
    while (total > 0){
      let thisPayment = payment + (total <= 0.02 ? total : 0);
      payments.push(thisPayment);
      total -= thisPayment;
      total = Math.round(total * 100) / 100;
    }
    return payments.map(payment => payment.toFixed(2));
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

  render(){
    return(
      <div className="login-form-container">
        <div className="login-welcome">One more step!</div>
        <div className="login-to-account">Review your subscription summary, and enter billing information.</div>

        <div className="partitions">
          <div className="signupPartition">
            <SubscriptionSummary
              currentUser={this.props.currentUser}
              currentPlan={this.props.currentPlan}
              calculatePayment={this.calculatePayment}
            />
          </div>
          <div className="signupPartition">

          <form>
            <div className="fullWidth">
              <label className="login-label">Credit card no.</label>
              <input
                type="text"
                autoComplete="credit_Card"
                value={this.state.card_number}
                onChange={this.update("card_number")}
                className="login-input"
              />
            </div>
            <div className="third left">
              <label className="login-label">CVV</label>
              <input
                type="text"
                autoComplete="cvv"
                value={this.state.card_code}
                onChange={this.update("card_code")}
                className="login-input"
              />
            </div>
            <div className="third middle">
              <label className="login-label">Exp. (MM/YY)</label>
              <input
                type="text"
                autoComplete="expiration"
                value={this.state.expiration}
                onChange={this.update("expiration")}
                className="login-input"
              />
            </div>
            <div className="third right">
              <label className="login-label">Zip</label>
              <input
                type="text"
                autoComplete="zipCode"
                value={this.state.zipCode}
                onChange={this.update("zipCode")}
                className="login-input"
              />
            </div>
            <div className="confirmationActions center">
              <button className={"primary -fullWidth"} id="bt-submit" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {entities: { users, subscription, plans }} = state;
  return {
    currentUser: Object.values(users)[0],
    currentPlan: plans[Object.values(subscription)[0].planId],
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingForm));