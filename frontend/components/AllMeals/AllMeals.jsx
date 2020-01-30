import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchMeals } from '../../actions/meal_actions';
import { fetchSchools } from '../../actions/school_actions';
import { fetchMenus } from '../../actions/menu_actions';
import { getDate } from '../const';

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
      await this.props.fetchMenus(this.state.schoolId)
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
      await this.props.fetchMenus(this.state.schoolId)
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
    let date = getDate();
    let cta = 'Sign Up Now'
    
    let menus = this.props.menus
      .filter(item => item.shop.showMenu)
      .map((menu, idx) => {
        return (
          <div className="meal-box" key={idx} style={{margin: '20px'}}>
            <img alt="" src={menu.imageUrl} />
            <div className="hidden-description">
              <ul>
                <li className="hidden-meal-name">{menu.name}</li>
                <li className="hidden-meal-desc">{menu.description}</li>
              </ul>
            </div>
            <div className="meal-box-description">
              <li className="tbd-item shop-name">{menu.shop.name}</li>
              <li className="tbd-item shop-address">{menu.shop.address}</li>
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
      <div className="meal-list" style={{margin: '0 0 20px'}}>
        {menus}
      </div>
    )

    return(
      <section className="todaysMenu">
        <div className="content -siteWidth">

          <div className="sectionHeader">
            <h4>Taste of {date}'s Menu</h4>
            <p style={{ maxWidth: '500px', margin: '0 auto 25px'}}>Your favorite local restaurants offer something different everyday. Get started and order from the full menu.</p>
            <button
                className='primary'
                type="submit"
                onClick={() => this.props.history.push('/signup')}
              >
                {cta}
              </button>
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
          {content}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.currentUser,
    schools: state.entities.schools,
    shops: Object.values(state.entities.shops),
    menus: Object.values(state.entities.menus)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMeals: (schoolId) => dispatch(fetchMeals(schoolId)),
    fetchSchools: () => dispatch(fetchSchools()),
    fetchMenus: (schoolId) => dispatch(fetchMenus(schoolId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMeals);
