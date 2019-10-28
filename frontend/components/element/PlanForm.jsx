import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup, clearErrors, login } from '../../actions/session_actions';
import { fetchPlans } from '../../actions/plan_actions'; // MOVE THIS TO SIGN UP PAGE


class PlanForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      planType: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlans();
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Plan selected')
  }

  render(){
    let { buttonText } = this.props;

    return(
      <div className="login-form-container">
      <div className="login-welcome">Select your plan.</div>
      <div className="login-to-account">Select a semester plan or a monthly plan. Your meals are served every day including holidays.</div>

      
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
    processJoinForm: (user) => dispatch(signup(user)),
    processLogIn: (user) => dispatch(login(user)),
    fetchPlans: () => dispatch(fetchPlans()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanForm));