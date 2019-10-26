import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup, clearErrors, login } from '../../actions/session_actions';
// import { fetchPlans } from '../../actions/plan_actions'; // MOVE THIS TO SIGN UP PAGE


class PlanForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      planType: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchPlans(); //MOVE THIS TO SIGN UP PAGE
  // }

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
      <div>SELECT PLAN</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schools: Object.values(state.entities.schools),
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processJoinForm: (user) => dispatch(signup(user)),
    processLogIn: (user) => dispatch(login(user)),
    fetchSchools: () => dispatch(fetchSchools()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanForm));