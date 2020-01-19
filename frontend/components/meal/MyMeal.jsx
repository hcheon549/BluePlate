import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchMenus } from '../../actions/menu_actions';
import { fetchSchools } from '../../actions/school_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { resetFilter } from '../../actions/filter_actions';
import { fetchReservations } from '../../actions/accountHistory_actions';
import { openModal } from "../../actions/modal_actions"

import MealIndex from "../meal_listing/meal_index";
import MealMap from "../map/meal_map";
import LoadingIcon from "./loading_icon";
import Tab from './Tab'
import Today from './Today'
import TodayReservations from "../reservations/TodayReservations";

class MyMeal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: "lunch",
      isMobile: window.innerWidth <= 560
    }
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.showEmailCapture = this.showEmailCapture.bind(this);
    this.openEmailCapture = this.openEmailCapture.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  
  async componentDidMount() {
    this.handleResize();
		window.addEventListener('resize', this.handleResize);
    await this.props.fetchMenus(this.props.currentUser.schoolId)
    await this.props.fetchReservations()
    await this.props.resetFilter()
    this.props.openClosedModal();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.schoolId !== this.props.currentUser.schoolId) {
      await this.props.fetchMenus(nextProps.currentUser.schoolId)
      this.props.resetFilter();
    }
  }


  async componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    removeEventListener('scroll', this.showEmailCapture);
    clearTimeout(this.openEmailCapture);
  }

  handleResize() {
		if (window.innerWidth <= 560 && this.state.isMobile === false) {
			this.setState({ isMobile: true });
		} else if (window.innerWidth > 560 && this.state.isMobile === true) {
			this.setState({ isMobile: false });
		}
	}

  showEmailCapture(){
    setTimeout(this.openEmailCapture, 9000)
  }

  openEmailCapture(){
    this.props.openEmailCapture();
    this.setState({
      seenEmailCapture: true
    })
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

        <div className="tabs-container">
          <div className="tabs">
            {this.state.isMobile && <Today isMobile={this.state.isMobile}/>}
            <Tab activeTab={this.state.activeTab} handleTab={this.handleTab} />
            {!this.state.isMobile && <Today isMobile={this.state.isMobile}/>}
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

const mapStateToProps = ({entities, ui}) => {
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
    signedDisclaimer: ui.disclaimerSignature,
    leadCaptureSeen: ui.leadCapture.seen
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
    openEmailCapture: () => dispatch(openModal({type: 'emailCapture'})),
  };
};

export default withRouter(connect(mapStateToProps, mayDispatchToProps)(MyMeal));