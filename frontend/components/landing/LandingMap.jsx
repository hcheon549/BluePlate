import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';
import { fetchMeals } from '../../actions/meal_actions';

import SchoolDropdown from './SchoolDropdown';
import MealMap from '../map/meal_map';

class LandingMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      school: null
    }
    this.update = this.update.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (!prevState.school && (prevProps.schools !== this.props.schools)){
      this.props.fetchMeals(this.props.schools[0].name)
      this.setState({
        school: this.props.schools[0].name
      })
    }
  }

  update(e){
    this.props.fetchMeals(e.target.value)
      .then(this.setState({
        school: e.target.value
      }))
  }

  render(){
    let { schools } = this.props

    return (
      <section className="landingMap">
        <div className="blueBackground" />
        <div className="content -siteWidth">
          <div className="sectionHeader">
            <h4>Find out the restaurants</h4>
          </div>

          <div className="mapSelector">
            <p>I'm in: </p>
            <div className="schoolSelector">
              <SchoolDropdown
                schools={schools}
                nextAction={this.update}
              />
            </div>
          </div>

          <div className="map">
            {this.state.school && <MealMap
              landing={true}
              school={this.state.school}
              />}
          </div>

        </div>
      </section>
    )
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
    fetchMeals: (school) => dispatch(fetchMeals(school)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingMap);
