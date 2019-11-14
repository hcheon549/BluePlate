import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createFavorite, deleteFavorite } from '../../actions/favorite_actions';
import { createReservation, updateReservation } from '../../actions/reservation_actions';
import { changeFilter } from '../../actions/filter_actions';
import { openModal } from '../../actions/modal_actions';
import { times, timeVals } from "../../util/time_vars";
import { handleReserve } from "../../actions/reservation_actions";

class MealIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seltime: ""
    };
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  }

  handleToggle() {
    if (this.props.favorite) {
      this.props.deleteFavorite(this.props.favId);
    } else {
      this.props.createFavorite({
        userId: this.props.currentUser.id,
        shopId: this.props.shop.id
      });
    }
  }

  handleHover(shopId = null) {
    this.props.changeFilter("marker", shopId);
  }

  render() {
    let { meal, shop, favorite } = this.props;
    return (
      <div
        onMouseEnter={() => this.handleHover(shop.id)}
        onMouseLeave={() => this.handleHover()}
        className="meal-box"
      >
        <button
          className={favorite ? "favorited" : "unfavorited"}
          onClick={() => this.handleToggle()}
          id="favorite-button"
        >
          <img
            alt=""
            src={
              favorite
                ? "https://res.cloudinary.com/mwojick/image/upload/v1528825174/TreatPal/icons/favorited.png"
                : "https://res.cloudinary.com/mwojick/image/upload/v1528825174/TreatPal/icons/unfavorited.png"
            }
          />
        </button>

        <select
          value={this.state.seltime}
          onChange={this.update("seltime")}
          className="select-time"
        >
          <option hidden value={null}>
            Pickup Time
          </option>
          {timeVals.map((tv, idx) => {
            return (
              <option key={idx} value={tv}>
                {times[idx]}
              </option>
            );
          })}
        </select>

        <button
          className={
            this.state.seltime === ""
              ? "reserve-btn time-not-selected"
              : "reserve-btn time-selected"
          }
          onClick={() => handleReserve(this.props, this.state)}
          id={`reserve-button`}
          disabled={this.state.seltime === ""}
        >
          RESERVE NOW
        </button>

        <div className="meal-box-title">
          <li>LUNCH</li>
        </div>

        <img alt="" src={meal.imageUrl} />

        <div className="hidden-description">
          <ul>
            <li className="hidden-meal-name">{meal.name.toUpperCase()}</li>
            <li className="hidden-meal-desc">{meal.description}</li>
          </ul>
        </div>

        <div className="meal-box-description">
          <li className="tbd-item meal-name">{meal.name}</li>
          <li className="tbd-item shop-name">{shop.name}</li>
          <li className="tbd-item shop-address">{shop.address}</li>
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    meal: ownProps.meal,
    shop: ownProps.shop,
    favorite: ownProps.favorite,
    favId: ownProps.favId,
    currentUser: state.entities.currentUser,
    resToday: state.ui.filters.restoday
  };
};

const mdp = (dispatch) => {
  return {
    openConfirmModal: () => dispatch(openModal({ type: 'confirm' })),
    createFavorite: (fav) => dispatch(createFavorite(fav)),
    deleteFavorite: (id) => dispatch(deleteFavorite(id)),
    createReservation: (res) => dispatch(createReservation(res)),
    updateReservation: (res) => dispatch(updateReservation(res)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default withRouter(connect(msp, mdp)(MealIndexItem));
