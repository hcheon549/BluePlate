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

  componentDidMount() {
    this.props.fetchSchools();
  }

  // componentDidUpdate(prevProps) {
    // if (prevProps.currentCityId !== this.props.currentCityId) {
    //   let cityId = this.props.currentCityId;
    //   this.props.fetchDeals(cityId);
    // }
  // }

  
  render(){

    return(
      <div className="visitor">
        <LandingHeader />
        <LandingHIW />
        <LandingMap {...this.props} />
        <LandingPlan />
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
    fetchMeals: (schoolId) => dispatch(fetchMeals(schoolId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
