import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMeals } from '../../actions/meal_actions';
import { fetchSchools } from '../../actions/school_actions';

import LoadingIcon from "../meal/loading_icon";
import SchoolDropdown from '../landing/SchoolDropdown';
import ImageSlider from "./ImageSlider";

class AllMeals extends Component{
  constructor(props){
    super(props);
    this.state = {
      schoolId: (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null),
      loading: true
    }
    this.update = this.update.bind(this);
  }

  async componentDidMount(){
    if (!this.state.schoolId){
      await this.props.fetchSchools()
    } else {
      await this.props.fetchMeals(this.state.schoolId)
      this.setState({
        loading: false
      })
    }
  }

  async componentDidUpdate(prevProps, prevState){
    if (prevProps.schools !== this.props.schools){
      this.setState({
        schoolId: Object.values(this.props.schools)[0].id
      })
    }
    if ((!prevState.schoolId && this.state.schoolId) || (prevState.schoolId !== this.state.schoolId)){
      await this.props.fetchMeals(this.state.schoolId)
      this.setState({
        loading: false
      })
    }
  }

  async update(e){
    this.setState({
      schoolId: e.target.value,
      loading: true
    })
  }

  render(){
    let shops = this.props.shops.map((shop, idx) => {
      var meal = shop.meals[Math.floor(Math.random()*(shop.meals.length))];
      let imageUrl = meal.imageUrl
      return (
        <div className="meal-box" key={idx} style={{margin: '20px'}}>
          <img alt="" src={imageUrl} />
          {/* <ImageSlider meals={shop.meals} /> */}
          <div className="meal-box-description">
          <li className="tbd-item meal-name">{meal.name}</li>
          <li className="tbd-item shop-name">{shop.name}</li>
          <li className="tbd-item shop-address">{shop.address}</li>
          </div>
        </div>
      )
    })

    let content = this.state.loading ? (
      <div>
        <div style={{ height: "60px" }} />
        <LoadingIcon />
      </div>
    ) : (
      <div className="meal-listing" style={{margin: '0 0 20px'}}>
        {shops}
      </div>
    )

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

          <div className="miniText" style={{marginTop: '15px'}}>
            Restaurants offer around 5 different menu items
          </div>

          {content}
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
