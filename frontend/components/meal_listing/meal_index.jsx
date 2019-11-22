import React from "react";
// import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MealIndexItem from "./meal_index_item";

class MealIndex extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.buildMenuItems = this.buildMenuItems.bind(this);
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

  buildMenuItems(menus) {
    return menus.map(menu => {
      return (
        <MealIndexItem
          key={menu.id}
          menu={menu}
          shop={this.props.shops[menu.shop.id]}
          activeTab={this.props.activeTab}
        />
      );
    })
  }

  render() {
    let { activeTab, lunchMenu, dinnerMenu } = this.props;
    let menus = activeTab == 'lunch' ? lunchMenu : dinnerMenu;

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

    return (
      <div className="meal-listing">
        {this.buildMenuItems(menus)}
      </div>
    );
  }
}

export default MealIndex;