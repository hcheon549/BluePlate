import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { clearErrors } from '../../actions/session_actions';
import { createSubscription, updateSubscription } from "../../actions/subscription_actions";
import { updateAccountSummary } from '../../actions/account_summary_actions';
import { fetchUser, updateUserMeals } from "../../actions/user_actions";

const CURRENT_PLAN_OFFERED = "1week";
class PlanForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      planType: null,
      selectedPlan: this.props.currentSubscription ? this.props.currentSubscription.planId : null,
      showError: false,
    }

    this.submitPlan = this.submitPlan.bind(this);
    this.buildPlans = this.buildPlans.bind(this);
  }

  selectPlan(planId){
    this.setState({
      showError: false,
      selectedPlan: planId,
    }, this.submitPlan)
  }

  async submitPlan() {
    // e.preventDefault();
    let response;
    this.setState({
      isPending: true
    })
    const subscription = Object.assign({}, { plan_id: parseInt(this.state.selectedPlan) })
    if (this.props.currentSubscription){
      response = await this.props.updateSubscription({
        subscriptionId: this.props.currentSubscription.id,
        plan_id: subscription.plan_id,
        meals: subscription.meals
      })
    } else {
      response = await this.props.processSubscription(subscription)
    }
    if (response.subscription){
      let aUpdate = await this.props.updateAccountSummary({
        id: this.props.currentUser.summary_id || this.props.currentUser.summary.id,
        subscription_id: response.subscription.id,
        policy_type: "Lead"
      })
      if (aUpdate.payload) {
        await this.props.fetchUser(this.props.currentUser.id)
        this.props.setStep('billing')
      }
    } else if (response.errors){
      console.log(response.errors)
      this.setState({
        isPending: false,
        showError: true
      })
    }
  }

  buildPlans(){
    let { plans } = this.props,
        { isPending, selectedPlan } = this.state,
        buttonText = "Select";

    let plansOffered = Object.values(plans).filter(plan => plan.planType == CURRENT_PLAN_OFFERED);

    return plansOffered.map(({id, name, meals, price}, idx) => {
      let perMeal = Math.round(price / meals * 100) / 100
      let spinit = isPending && selectedPlan == id
      return (
        <li key={id}>
          <div>
            <h4>{name}</h4>
            <span className="smallText">per week</span>
            <p>${perMeal} per meal</p>
          </div>
          <div className="line" />
          <div className="detail">
            <p>1-Week Trial,</p>
            <p>4-Week cycle renewal,</p>
            <p>Unused credits roll over to next cycle.</p>
          </div>
          <button className={"secondary" + (spinit ? " -pending" : "")} onClick={this.selectPlan.bind(this, id)}>{!spinit && buttonText}</button>
        </li>
      )
    })
  }



  render(){
    let { plans } = this.props,
        { showError } = this.state,
        error = showError ? (<div className="error" role="alert">You must select a plan.</div>) : null;

    return(
      <div className="planForm">
        {plans &&
          <ul className="plans">
            {this.buildPlans()}
          </ul>}
          {error}
        <span className="miniText"><em>State and local taxes may apply.<br/>For more information about BluePlattr plans, <Link to="/faq" target="_blank">click here</Link></em></span>
      </div>
    )
  }
}

const mapStateToProps = ({entities, errors}) => {
  return {
    currentUser: entities.currentUser,
    currentSubscription: entities.currentUser.subscription,
    plans: entities.plans,
    errors: errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    processSubscription: (plan_id) => dispatch(createSubscription(plan_id)),
    updateSubscription: (subscriptionData) => dispatch(updateSubscription(subscriptionData)),
    updateAccountSummary: (summaryData) => dispatch(updateAccountSummary(summaryData)),
    updateUserMeals: (userData) => dispatch(updateUserMeals(userData)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanForm));