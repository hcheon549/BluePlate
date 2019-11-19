import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { clearErrors } from '../../actions/session_actions';
import { createSubscription, updateSubscription } from "../../actions/subscription_actions";
import { updateAccountSummary } from '../../actions/account_summary_actions';
import { fetchUser, updateUserMeals } from "../../actions/user_actions";

class PlanForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      planType: null,
      selectedPlan: this.props.currentSubscription ? this.props.currentSubscription.planId : null,
      showError: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildPlans = this.buildPlans.bind(this);
  }

  togglePlan(planId){
    this.setState({
      showError: false,
      selectedPlan: planId,
    })
  }

  buildPlans(){
    let { plans } = this.props,
        { selectedPlan } = this.state;
    return Object.values(plans).map(({id, name, meals, price}, idx) => {
      let perMeal = Math.round(price / meals * 100) / 100
      return (
        <li className={(selectedPlan == id) ? 'active' : ''} key={idx} onClick={this.togglePlan.bind(this, id)}>
          <h5>Plan {idx+1}</h5>
          <h4>{name}</h4>
          <span className="smallText">per week</span>
          <p><em>${perMeal} per meal</em></p>
        </li>
      )
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    let res;
    this.setState({
      isPending: true
    })
    const subscription = Object.assign({}, { plan_id: parseInt(this.state.selectedPlan) })
    if (this.props.currentSubscription){
      res = await this.props.updateSubscription({
        subscriptionId: this.props.currentSubscription.id,
        plan_id: subscription.plan_id,
        meals: subscription.meals
      })
    } else {
      res = await this.props.processSubscription(subscription)
    }
    if (res.subscription){
      debugger
      let aUpdate = await this.props.updateAccountSummary({
        id: this.props.currentUser.summary_id || this.props.currentUser.summary.id,
        subscription_id: res.subscription.id,
        policy_type: "Lead"
      })
      debugger
      if (aUpdate.payload) {
        await this.props.fetchUser(this.props.currentUser.id)
        this.props.setStep('billing')
      }
    } else if (res.errors){
      console.log(res.errors)
      this.setState({
        isPending: false,
        showError: true
      })
    }
  }

  render(){
    let { plans } = this.props,
        { isPending, showError } = this.state,
        buttonText = "Next",
        error = showError ? (<div className="error" role="alert">You must select a plan.</div>) : null;

    return(
      <div className="planForm">
        {plans &&
          <ul className="plans">
            {this.buildPlans()}
          </ul>}
          {error}
        <button className={"primary -fullWidth" + (isPending ? " -pending" : "")} onClick={this.handleSubmit}>{!isPending && buttonText}</button>
        <span className="miniText"><em>State and local taxes may apply.<br/>For more information about BluePlate plans, <Link to="/faq" target="_blank">click here</Link></em></span>
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