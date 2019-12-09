import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchMenus } from '../../actions/menu_actions';
import { fetchSchools } from '../../actions/school_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { resetFilter } from '../../actions/filter_actions';
import { fetchReservations } from '../../actions/accountHistory_actions';
import { openModal } from "../../actions/modal_actions";
import { logout } from '../../actions/session_actions';

import MealIndex from "../meal_listing/meal_index";
import MealMap from "../map/meal_map";
import LoadingIcon from "./loading_icon";
import Tab from './Tab'
import Today from './Today'

// import Search from "../search/search";
import TodayReservations from "../reservations/TodayReservations";

class MyMeal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: "lunch"
    }
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }
  
  async componentDidMount() {
    await this.props.fetchMenus(this.props.currentUser.schoolId)
    if (this.props.location.pathname == "/demo"){
      this.props.openDisclaimer();
    } else {
      this.props.openClosedModal();
    }
    await this.props.fetchReservations()
    await this.props.resetFilter()
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.schoolId !== this.props.currentUser.schoolId) {
      await this.props.fetchMenus(nextProps.currentUser.schoolId)
      this.props.resetFilter();
    }
  }

  async componentWillUnmount(){
    if (this.props.location.pathname == "/demo"){
      await this.props.logout();
    }
  }

  handleCollapse() {
    let arrowR = this.refs.arrowRight;
    let arrowL = this.refs.arrowLeft;
    let map = document.getElementById("map");
    let menuListing = document.getElementsByClassName("meal-listing")[0];

    if (map.style.minWidth !== "0px") {
      map.classList.toggle("map-transition");
      map.style.minWidth = "0px";
      arrowL.style.display = "block";
      arrowR.style.display = "none";
      if (menuListing) {
        menuListing.classList.toggle("meal-listing-map-collapse");
      }
    } else {
      setTimeout(() => {
        map.classList.toggle("map-transition");
      }, 300);
      map.style.minWidth = "25vw";
      arrowL.style.display = "none";
      arrowR.style.display = "block";
      if (menuListing) {
        menuListing.classList.toggle("meal-listing-map-collapse");
      }
    }
  }

  handleTab(tab){
    this.setState({
      activeTab: tab
    })
  }

  render() {
    if (this.props.loading) {
      return <LoadingIcon />;
    }
    return (
      <div className="greeting-container">
        <TodayReservations {...this.props}/>

        <div className="search-container">
          <div className="tabs">
            <Tab 
              activeTab={this.state.activeTab}
              handleTab={this.handleTab}
            />
            <Today />
          </div>
          
          <div className="borderLine" />
        </div>

        <div className="meals-and-map">
          <MealIndex
            {...this.props}
            activeTab={this.state.activeTab} 
            handleTab={this.handleTab}
          />

          <div
            ref="coll"
            onClick={() => this.handleCollapse()}
            className="collapsible-map"
            id="collapsible-map"
          >
            <div ref="arrowLeft" className="arrow arrow-left" />
            <div ref="arrowRight" className="arrow arrow-right" />
          </div>
          <div className="map-container">
            <MealMap
              {...this.props}
              activeTab={this.state.activeTab}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({entities}) => {
  const todayMenu = Object.values(entities.menus);
  const pickupTime = entities.pickupTime

  return {
    currentUser: entities.currentUser,
    shops: entities.shops,
    lunchMenu: todayMenu.filter(menu => menu.lunch),
    dinnerMenu: todayMenu.filter(menu => menu.dinner),
    lunchTime: pickupTime.lunch,
    dinnerTime: pickupTime.dinner,
    todayReservations: entities.todayReservations,
  };
};

const mayDispatchToProps = (dispatch) => {
  return {
    fetchMenus: (schoolId) => dispatch(fetchMenus(schoolId)),
    fetchSchools: () => dispatch(fetchSchools()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    fetchReservations: () => dispatch(fetchReservations()),
    resetFilter: () => dispatch(resetFilter()),
    openReserveModal: (data) => dispatch(openModal({ type: 'reserve', data })),
    openClosedModal: () => dispatch(openModal({ type: 'closed'})),
    openDisclaimer: () => dispatch(openModal({type: 'disclaimer'})),
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mayDispatchToProps)(MyMeal));