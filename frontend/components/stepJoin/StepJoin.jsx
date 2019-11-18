import React from 'react';
import { connect } from 'react-redux';

import { fetchSchools } from '../../actions/school_actions';
import { setStepJoinStep } from '../../actions/stepjoin_actions';
import { fetchPlans } from '../../actions/plan_actions'; // MOVE THIS TO SIGN UP PAGE

import SignupForm from '../session_form/SignUpForm';
import PlanForm from './PlanForm';
import BillingForm from './BillingForm';
import SignupSectionHeader from './SignupSectionHeader';

class StepJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: null
    }
    this.setStep = this.setStep.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchPlans();
    let policyType = this.props.currentUser ? this.props.currentUser.policyType : null
    if (policyType == 'Visitor'){
      this.props.setStepJoin('plan')
    } else if (policyType == 'Lead'){
      this.props.setStepJoin('billing')
    } else {
      this.props.setStepJoin('account')
    }
  }

  setStep(nextForm) {
    this.props.setStepJoin(nextForm)
  }

  render(){
    let content;
    let policyType = this.props.currentUser ? this.props.currentUser.policyType : null

    if (this.props.stepJoin == 'plan' || policyType == 'Visitor'){
      content = <PlanForm setStep={this.setStep} />
    } else if ( this.props.stepJoin == 'billing' || policyType == 'Lead'){
      content = <BillingForm setStep={this.setStep} />
    } else {
      content = <SignupForm setStep={this.setStep} />
    }

    return(
      <div className="login-page">
        <div className="login-form-main">
          <div className="login-form-container">
            <SignupSectionHeader form={this.props.stepJoin} />
            {content}
          </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.entities.currentUser);
  return {
    currentUser: state.entities.currentUser,
    schools: Object.values(state.entities.schools),
    stepJoin: state.ui.stepJoin || ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStepJoin: (step) => dispatch(setStepJoinStep(step)),
    fetchSchools: () => dispatch(fetchSchools()),
    fetchPlans: () => dispatch(fetchPlans()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepJoin);
