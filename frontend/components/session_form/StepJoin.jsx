import React from 'react';
import { connect } from 'react-redux';

import { fetchSchools } from '../../actions/school_actions';
import { setStepJoinStep } from '../../actions/stepjoin_actions';

import SignupForm from '../session_form/SignUpForm';
import PlanForm from '../element/PlanForm';
import BillingForm from '../element/BillingForm';
import SignupSectionHeader from '../element/SignupSectionHeader';

class StepJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: null
    }
    this.setStep = this.setStep.bind(this);
  }

  componentDidMount() {
    this.props.setStepJoin('account')
  }

  setStep(nextForm) {
    this.props.setStepJoin(nextForm)
  }

  render(){
    let content;

    switch(this.props.stepJoin){
      case 'plan':
        content = <PlanForm setStep={this.setStep} />
        break;
      case 'billing':
        content = <BillingForm setStep={this.setStep} />
       break;
      case 'account':
      default:
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
  return {
    schools: Object.values(state.entities.schools),
    stepJoin: state.ui.stepJoin || ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStepJoin: (step) => dispatch(setStepJoinStep(step)),
    fetchSchools: () => dispatch(fetchSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepJoin);
