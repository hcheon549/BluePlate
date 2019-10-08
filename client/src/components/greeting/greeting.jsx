import React from "react";
// import { Link, Redirect } from 'react-router-dom';
import MealIndexContainer from "../meal_listing/meal_index_container";
import SearchContainer from "../search/search_container";
import MealMapContainer from "../map/meal_map_container";
import ReservationsContainer from "../reservations/reservations_container";
import LoadingIcon from "./loading_icon";

class Greeting extends React.Component {
  componentDidMount() {
    this.props
      .fetchCities()
      .then(this.props.fetchMeals(this.props.currentUser.preferredCity))
      .then(this.props.fetchFavorites())
      .then(this.props.fetchReservations())
      .then(this.props.resetFilter());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== "/") {
      this.props.history.push("/");
    }
    if (
      nextProps.currentUser.preferredCity !==
      this.props.currentUser.preferredCity
    ) {
      this.props
        .fetchMeals(nextProps.currentUser.preferredCity)
        .then(this.props.resetFilter());
    }
  }

  handleCollapse() {
    let arrowR = this.refs.arrowRight;
    let arrowL = this.refs.arrowLeft;
    let map = document.getElementById("map");
    let mealListing = document.getElementsByClassName("meal-listing")[0];

    if (map.style.minWidth !== "0px") {
      map.classList.toggle("map-transition");
      map.style.minWidth = "0px";
      arrowL.style.display = "block";
      arrowR.style.display = "none";
      if (mealListing) {
        mealListing.classList.toggle("meal-listing-map-collapse");
      }
    } else {
      setTimeout(() => {
        map.classList.toggle("map-transition");
      }, 300);
      map.style.minWidth = "33vw";
      arrowL.style.display = "none";
      arrowR.style.display = "block";
      if (mealListing) {
        mealListing.classList.toggle("meal-listing-map-collapse");
      }
    }
  }

  render() {
    if (this.props.loading) {
      return <LoadingIcon />;
    }

    return (
      <div className="greeting-container">
        <div className="reservations-container">
          <ReservationsContainer />
        </div>

        <div className="search-container">
          <SearchContainer />
        </div>

        <div className="meals-and-map">
          <MealIndexContainer />

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
            <MealMapContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Greeting;
