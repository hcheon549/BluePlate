import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';
import { fetchMeals } from '../../actions/meal_actions';

import SignupForm from '../session_form/SignUpForm';
import PlanForm from '../element/PlanForm';
// import Billing from '../element/Billing';

class StepJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: null
    }
    this.setStep = this.setStep.bind(this);
  }

  componentDidMount() {
    this.setState({step: 'account'})
  }

  setStep(nextForm) {
    this.setState({step: nextForm})
  }

  render(){
    let content;

    switch(this.state.step){
      case 'plan':
        content = <PlanForm setStep={this.setStep} />
        break;
      // case 'billing':
      //   content = <PlanForm />
      //  break;
      case 'account':
      default:
          content = <SignupForm setStep={this.setStep} />
    }

    return(
      <div className="login-page">
        <div className="login-form-main">
          {content}
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: Object.values(state.entities.schools),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepJoin);
