import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { signup, clearErrors, login } from '../../actions/session_actions';
import { fetchPlans } from '../../actions/plan_actions'; // MOVE THIS TO SIGN UP PAGE
import { createSubscription } from "../../actions/subscription_actions";

class PlanForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      planType: null,
      selectedPlan: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildPlans = this.buildPlans.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlans();
  }

  togglePlan(planId){
    console.log("Selected Plan Id: ", planId)
    this.setState({
      selectedPlan: planId,
    })
  }

  buildPlans(){
    let { plans } = this.props,
        { selectedPlan } = this.state;
    return plans.map(({id, name, meals, price}, idx) => {
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
    const subscription = Object.assign({}, {plan_id: parseInt(this.state.selectedPlan)})
    let res = await this.props.processSubscription(subscription)
    if (res.subscription){
      this.props.setStep('billing')
    } else if (res.errors){
      console.log(res.errors)
    }
  }

  render(){
    let { plans } = this.props;
    return(
      <div className="login-form-container">
      <div className="login-welcome">Select your plan.</div>
      <div className="login-to-account">Select this semester's BluePlate Plan.</div>

        <div className="planForm">
          {plans &&
            <ul className="plans">
              {this.buildPlans()}
            </ul>}
          <button className="primary -fullWidth" onClick={this.handleSubmit}>Next</button>
          <span className="miniText"><em>State and local taxes may apply.<br/>For more information about BluePlate plans, <Link to="/faq" target="_blank">click here</Link></em></span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.entities.plans),
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processSubscription: (plan_id) => dispatch(createSubscription(plan_id)),
    fetchPlans: () => dispatch(fetchPlans()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanForm));