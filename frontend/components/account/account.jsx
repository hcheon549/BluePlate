import React from "react";
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUser } from '../../actions/user_actions';
import { openModal } from "../../actions/modal_actions";

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // this.props.openClosedModal();
  }

  render() {
    let { currentUser, currentPlan } = this.props;
    console.log(currentPlan)
    return (
      <div className="account-page">
        <div className="account-top">
          <div className="account-hi">Hi {currentUser.fname}!</div>
          <div className="account-plan">
            You are currently on the <span className="nowrap">{currentPlan.name}-per-Week</span> plan
          </div>
          <div className="account-cycle">
            You have <span>{currentUser.summary.mealCreditsLeft} meals</span> left in your cycle.
          </div>
          <div className="acc-info">
            <span>ACCOUNT INFORMATION</span>
          </div>
        </div>

        <div className="account-bottom">

          <div className="personal-information">
            <h5>Personal Information</h5>
            <div className="field name">
              <div className="label">First Name: </div>
              <div className="value">{currentUser.fname}</div>
            </div>

            <div className="field name">
              <div className="label">Last Name: </div>
              <div className="value">{currentUser.lname}</div>
            </div>

            <div className="field email">
              <div className="label">Email: </div>
              <div className="value">{currentUser.email}</div>
            </div>

            <div className="field school">
              <div className="label">Campus: </div>
              <div className="value">{currentUser.enrolledSchool.name}</div>
            </div>
          </div>

          <div className="subscription-information">
            <h5>Meal Plan Information</h5>
            <div className="field subscription">
              <div className="label">Current Plan: </div>
              <div className="value">{currentPlan.name}-per-Week Plan</div>
            </div>

            <div className="field subscription">
              <div className="label">Meals Left: </div>
              <div className="value">{currentUser.summary.mealCreditsLeft} Meal Credits</div>
            </div>

            <div className="field subscription">
              <div className="label">Start Date: </div>
              <div className="value">{currentUser.subscription.subscriptionStart}</div>
            </div>

            <div className="field subscription">
              <div className="label">Renew Date: </div>
              <div className="value">{currentUser.subscription.subscriptionEnd}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const msp = ({entities, errors}) => {
  return {
    currentUser: entities.currentUser,
    currentPlan: entities.plans[entities.currentUser.subscription.planId],
    errors: errors.users
  };
};

const mdp = (dispatch) => {
 return {
   updateUser: (user) => dispatch(updateUser(user)),
   openClosedModal: () => dispatch(openModal({ type: 'closed'}))
 };
};

export default withRouter(connect(msp, mdp)(Account));
