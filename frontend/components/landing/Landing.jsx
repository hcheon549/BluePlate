import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';
import { fetchMeals } from '../../actions/meal_actions';

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
        <LandingHeader />
        <LandingHIW />
        {!schoolEmpty && <LandingMap {...this.props} />}
        <LandingPlan />
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.entities.schools,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
