import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';
import { login } from '../../actions/session_actions';

import LandingHeader from './LandingHeader'
import LandingHIW from './LandingHIW';
import LandingMap from './LandingMap';
import LandingPlan from './LandingPlan';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    let schoolEmpty = Object.keys(this.props.schools).length == 0

    return(
      <div className="visitor">
        <LandingHeader {...this.props} />
        <LandingHIW />
        {!schoolEmpty && <LandingMap {...this.props} />}
        <LandingPlan {...this.props} />
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.entities.schools,
    currentUser: state.entities.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
    processLogIn: (user) => dispatch(login(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
