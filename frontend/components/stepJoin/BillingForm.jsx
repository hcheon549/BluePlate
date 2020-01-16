/*
  BillingForm
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '../../actions/session_actions';
import { updateUserEmail } from '../../actions/user_actions';

import SubscriptionSummary from './SubscriptionSummary';
import BillingInputStripe from './BillingInput';


class BillingForm extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      updateEmail: false,
    }

    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
  }

  toggleUpdateForm() {
    this.setState({ updateEmail: !this.state.updateEmail })
  }

  render(){
    return(
      <React.Fragment>
        <div className="partitions">
          <div className="signupPartition">
            <SubscriptionSummary
              {...this.props}
              toggleUpdateForm={this.toggleUpdateForm}
              updateEmail={this.state.updateEmail}
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
  const {entities: { currentUser, subscription, plans }, ui} = state;

  return {
    currentUser,
    currentPlan: currentUser ? plans[currentUser.subscription.planId] : null,
    promoApplied: ui.promo,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    updateUserEmail: (userData) => dispatch(updateUserEmail(userData))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingForm));