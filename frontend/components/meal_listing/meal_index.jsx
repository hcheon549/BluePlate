import React from "react";
// import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { resetFilter } from '../../actions/filter_actions';
import { withRouter } from 'react-router-dom';
import { getFavorites, getFavMeals, getFavIds } from '../../util/selectors';

import MealIndexItem from "./meal_index_item";

class MealIndex extends React.Component {
  handleClick() {
    // handles resetting filters when map is collapsed
    let coll = document.getElementById("collapsible-map");
    let map = document.getElementById("map");
    if (map.style.minWidth === "0px") {
      let myPromise = new Promise((resolve, reject) => {
        coll.click();
        setTimeout(() => {
          resolve();
        }, 300);
      });
      myPromise.then(success => {
        this.props.resetFilter();
      });
    } else {
      this.props.resetFilter();
    }
  }

  render() {
    let { meals, shops, favorites, favIds } = this.props;

    if (meals.length === 0) {
      return (
        <div className="meal-errors">
          <div className="meal-errors-text">
            <div className="meal-errors-sorry">Sorry, no meals found.</div>
            <div className="meal-errors-try">Please try the following:</div>
            <div className="meal-errors-list">
              <li>Zoom out the map</li>
              <li>Search for something else</li>
              <li>Change your filters</li>
            </div>
          </div>
          <button
            onClick={() => this.handleClick()}
            className="meal-errors-reset"
          >
            RESET ALL!
          </button>
        </div>
      );
    }

    return (
      <div className="meal-listing">
        {meals.map(meal => {
          return (
            <MealIndexItem
              key={meal.id}
              meal={meal}
              shop={shops[meal.shopId]}
              favorite={favorites[meal.shopId]}
              favId={favIds[meal.shopId]}
            />
          );
        })}
      </div>
    );
  }
}

const msp = (state) => {
  let isFav = state.ui.filters.favorite;
  let mealVals = Object.values(state.entities.meals)

  let favIds = getFavIds(state.entities.favorites);
  let favs = getFavorites(state.entities.favorites);

  if (isFav) {
    mealVals = getFavMeals(mealVals, favs);
  }

  return {
    currentUser: state.entities.currentUser,
    meals: mealVals,
    shops: state.entities.shops,
    favorites: favs,
    favIds: favIds,
    loading: state.ui.loading.searchLoading
  };
};

const mdp = (dispatch) => {
  return {
    resetFilter: () => dispatch(resetFilter())
  };
};

export default withRouter(connect(msp, mdp)(MealIndex));
