import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateFilter, changeFilter } from '../../actions/filter_actions';
import { getEnrolledSchool } from '../../util/selectors';
import { openModal } from '../../actions/modal_actions';
import { getFavorites, getFavMeals, getFavShops, mapShopIdToMeal, getCurrentSchool } from '../../util/selectors';

import MarkerManager from "../../util/marker_manager";

const google = window.google;

// const getCoordsObj = latLng => ({
//   lat: latLng.lat(),
//   lng: latLng.lng()
// });

class MealMap extends React.Component {
  constructor(props) {
    super(props);

    this.updateBounds = this.updateBounds.bind(this);

    this.mapOptions = {
      center: {
        lat: this.props.enrolledSchool.latitude,
        lng: this.props.enrolledSchool.longitude
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
      this.props.openReserveModal
    );

    // this.MarkerManager.drop(this.props.shops, this.props.menus);
    this.MarkerManager.updateMarkers(this.props.shops, this.props.menus);

    if (!this.props.landing){this.registerListeners();}
  }

  // fix for when enrolledSchool is not available on tab reopen
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.enrolledSchool.latitude !== this.props.enrolledSchool.latitude
    ) {
      let latLng = new google.maps.LatLng(
        nextProps.enrolledSchool.latitude,
        nextProps.enrolledSchool.longitude
      );
      this.map.setCenter(latLng);
    }
  }

  componentDidUpdate() {
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

      this.props.updateFilter(
        this.props.enrolledSchool.name,
        this.props.search,
        "bounds",
        bounds
      );
    }
  }

  registerListeners() {
    google.maps.event.addListener(this.map, "dragend", this.updateBounds);
    google.maps.event.addListener(this.map, "zoom_changed", this.updateBounds);
  }

  render() {
    return (
      <div className="map-resize">
        <div id="map" ref="map" />
      </div>
    );
  }
}

const msp = ({ entities: { currentUser, menus, shops, favorites, schools }, session, ui }) => {

  let isFav = ui.filters.favorite;
  let shopVals = Object.values(shops);
  let menuVals = Object.values(menus);
  let currentSchool = session.id ? getEnrolledSchool(session, currentUser, schools) : getCurrentSchool(shopVals, schools);

  if (isFav) {
    let favs = getFavorites(favorites);
    shopVals = getFavShops(shopVals, favs);
    menuVals = getFavMeals(menuVals, favs);
  }
  
  return {
    menus: mapShopIdToMeal(menuVals),
    shops: shopVals,
    enrolledSchool: currentSchool,
    center: ui.filters.center,
    search: ui.filters.search,
    marker: ui.filters.marker
  };
};


const mdp = (dispatch) => {
  return {
    updateFilter: (school, search, filter, bounds) => dispatch(updateFilter(school, search, filter, bounds)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    openReserveModal: (menu, shop) => dispatch(openModal({ type: 'reserve', menu: menu, shop: shop }))
  };
};

export default withRouter(connect(msp, mdp)(MealMap));