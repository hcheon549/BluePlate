/*
  BillingForm
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '../../actions/session_actions';

import SubscriptionSummary from './SubscriptionSummary';
import BillingInputStripe from './BillingInput';


class BillingForm extends React.Component{

  constructor(props){
    super(props)
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

  render(){
    return(
      <React.Fragment>
        <div className="partitions">
          <div className="signupPartition">
            <SubscriptionSummary
              currentUser={this.props.currentUser}
              currentPlan={this.props.currentPlan}
              calculatePayment={this.calculatePayment}
            />
          </div>
          <div className="signupPartition">
            <BillingInputStripe {...this.props} />
          </div>
        </div>
      </React.Fragment>
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