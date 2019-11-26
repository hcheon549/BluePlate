import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';
import { fetchMenus } from '../../actions/menu_actions';

import SchoolDropdown from './SchoolDropdown';
import MealMap from '../map/meal_map';

class LandingMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      schoolId: (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null)
    }
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    // CHECK N+1 QUERY HERE
    if (this.state.schoolId){
      this.props.fetchMenus(this.state.schoolId)
    }
  }

  async update(e){
    await this.props.fetchMenus(e.target.value)
    this.setState({
        schoolId: e.target.value
      })
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
            {this.state.schoolId && <MealMap
              landing={true}
              school={this.state.schoolId}
              />}
          </div>

        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
    fetchMenus: (schoolId) => dispatch(fetchMenus(schoolId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingMap);
