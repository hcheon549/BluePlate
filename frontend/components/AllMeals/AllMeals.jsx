import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMeals } from '../../actions/meal_actions';
import { fetchSchools } from '../../actions/school_actions';

import SchoolDropdown from '../landing/SchoolDropdown';

class AllMeals extends Component{
  constructor(props){
    super(props);
    this.state = {
      schoolId: (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null)
    }
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    if (!this.state.schoolId){
      this.props.fetchSchools()
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.schools !== this.props.schools){
      this.setState({
        schoolId: Object.values(this.props.schools)[0].id
      })
    }
    if (!prevState.schoolId && this.state.schoolId){
      this.props.fetchMeals(this.state.schoolId)
    }
  }

  async update(e){
    await this.props.fetchMeals(e.target.value)
    this.setState({
      schoolId: e.target.value
    })
  }

  render(){
    let shops = this.props.shops.map((shop, idx) => (
      <div className="meal-box">
        <img alt="" src={menu.imageUrl} />
      </div>
    ))

    return(
      <section className="landingMap">
        <div className="content -siteWidth">

          <div className="sectionHeader">
            <h4>All Meals</h4>
          </div>

          <div className="mapSelector">
            <p>I'm in: </p>
            <div className="schoolSelector">
              <SchoolDropdown
                schools={this.props.schools}
                nextAction={this.update}
              />
            </div>
          </div>

          <div className="meal-listing">
            {shops}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.entities.schools,
    shops: Object.values(state.entities.shops),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMeals: (schoolId) => dispatch(fetchMeals(schoolId)),
    fetchSchools: () => dispatch(fetchSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMeals);
