import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { signup, clearErrors, login } from '../../actions/session_actions';
import { fetchPlans } from '../../actions/plan_actions'; // MOVE THIS TO SIGN UP PAGE
import { createSubscription, updateSubscription } from "../../actions/subscription_actions";
import { updateUserMeals } from "../../actions/user_actions";

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

  componentDidMount() {
    this.props.fetchPlans();
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
      this.props.updateUserMeals({
        id: this.props.currentUser.id,
        meals_left: res.subscription.mealCredit
      })
      .then(this.props.setStep('billing'))
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
    currentSubscription: entities.subscription,
    plans: entities.plans,
    errors: errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processSubscription: (plan_id) => dispatch(createSubscription(plan_id)),
    updateSubscription: (subscriptionData) => dispatch(updateSubscription(subscriptionData)),
    updateUserMeals: (userData) => dispatch(updateUserMeals(userData)),
    fetchPlans: () => dispatch(fetchPlans()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanForm));