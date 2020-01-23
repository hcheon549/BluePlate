import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeFilter } from '../../actions/filter_actions';
import { updateMapMenus } from '../../actions/menu_actions'

import MarkerManager from "../../util/marker_manager";

const google = window.google;

class MealMap extends React.Component {
  constructor(props) {
    super(props);
    this.updateBounds = this.updateBounds.bind(this);

    this.mapOptions = {
      center: {
        lat: this.props.landing ? this.props.school.latitude : this.props.enrolledSchool.latitude,
        lng: this.props.landing ? this.props.school.longitude : this.props.enrolledSchool.longitude
      },
      zoom: 15,
      clickableIcons: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    };
  }

  componentDidMount() {
    const mapRef = this.refs.map;
    this.map = new google.maps.Map(mapRef, this.mapOptions);

    this.MarkerManager = new MarkerManager(
      this.map,
      this.props.openReserveModal,
      this.props.landing
    );

    this.MarkerManager.updateMarkers(this.props.shops, this.props.menus);

    // Not updating the shops when the map moves on the Landing Page
    // if (!this.props.landing){this.registerListeners();}
  }

  componentDidUpdate(prevProps) {
    this.MarkerManager.updateMarkers(this.props.shops, this.props.menus);
    this.MarkerManager.highlightMarker(this.props.marker);

    if (this.props.center) {
      let latLng = new google.maps.LatLng(
        this.props.enrolledSchool.latitude,
        this.props.enrolledSchool.longitude
      );

      this.map.setCenter(latLng);
      this.map.setZoom(15);

      this.updateBounds();

      this.props.changeFilter("center", false);
    }

    if (this.props.landing) {
      let latLng = new google.maps.LatLng(
        this.props.school.latitude,
        this.props.school.longitude
      );

      this.map.setCenter(latLng);
      this.map.setZoom(15);
    }
  }

  updateBounds() {
    let mapBounds = this.map.getBounds();

    //handle edge case where bounds are sometimes not defined on refresh
    if (mapBounds) {
      // window.scrollTo(0, 280);

      const { north, south, east, west } = mapBounds.toJSON();

      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };

      this.props.updateMapMenus({
        schoolId: this.props.landing ? this.props.school.id : this.props.enrolledSchool.id,
        bounds: bounds
      });
    }
  }

  // registerListeners() {
  //   //Not being used on Landing Page Map
  //   google.maps.event.addListener(this.map, "dragend", this.updateBounds);
  //   google.maps.event.addListener(this.map, "zoom_changed", this.updateBounds);
  // }

  render() {
    return (
      <div className="map-resize">
        <div id="map" ref="map" />
      </div>
    );
  }
}

const msp = ({entities, ui}, ownProps) => {
  const allMenus = Object.values(entities.menus);

  return {
    currentUser: entities.currentUser,
    enrolledSchool: entities.currentUser ? entities.currentUser.enrolledSchool : null,
    menus: ownProps.activeTab ? allMenus.filter(menu => menu[ownProps.activeTab]) : allMenus,
    shops: Object.values(entities.shops),

    center: ui.filters.center,
    search: ui.filters.search,
    marker: ui.filters.marker
  };
};


const mdp = (dispatch) => {
  return {
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    updateMapMenus: (data) => dispatch(updateMapMenus(data))
  };
};

export default withRouter(connect(msp, mdp)(MealMap));