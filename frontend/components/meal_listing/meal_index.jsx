import React from "react";
// import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MealIndexItem from "./meal_index_item";

class MealIndex extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

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
    let { activeTab, lunchMenu, dinnerMenu, lunchTime, dinnerTime, shops } = this.props;
    let menus = activeTab == 'lunch' ? lunchMenu : dinnerMenu;
    let times = activeTab == 'lunch' ? lunchTime : dinnerTime;

    if (menus.length === 0) {
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
    debugger
    return (
      <div className="meal-listing">
        {menus.map(menu => 
          <MealIndexItem
            openReserveModal={this.props.openReserveModal}
            key={menu.id}
            menu={menu}
            shop={shops[menu.shop.id]}
            activeTab={activeTab}
            pickupTime={times}
          />
        )}
      </div>
    );
  }
}

export default MealIndex;