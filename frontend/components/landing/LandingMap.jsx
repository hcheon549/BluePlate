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
      schoolId: (this.props.currentUser.schoolId || (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null))
    }
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    if (this.state.schoolId){
      this.props.fetchMenus(this.state.schoolId)
    }
  }

  async componentDidUpdate(prevProps, prevState){
    if (prevProps.schools == null && Object.values(this.props.schools)[0]){
      this.setState({
        schoolId: Object.values(this.props.schools)[0].id
      })
    }
    if ((!prevState.schoolId && this.state.schoolId) || (prevState.schoolId !== this.state.schoolId)){
      await this.props.fetchMenus(this.state.schoolId)
    }
  }

  update(e){
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
                schoolId={this.state.schoolId}
              />
            </div>
          </div>
          <Link className="full-list miniText"to="/all-meals">See Full List</Link>


          <div className="map">
            {this.state.schoolId && <MealMap
              landing={true}
              school={schools[this.state.schoolId]}
              />}
          </div>
          <span className="tinyText" style={{color: 'white'}}>*The website is current on BETA mode. The restaurants displayed are not real-life businesses</span>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.entities.currentUser)
  return {
    currentUser: state.entities.currentUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
    fetchMenus: (schoolId) => dispatch(fetchMenus(schoolId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingMap);
