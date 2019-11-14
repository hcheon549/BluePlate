import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";

import {
  createReservation,
  updateReservation,
  handleReserve
} from "../../actions/reservation_actions";

import { times, timeVals } from "../../util/time_vars";

class ReservationModal extends React.Component {
  constructor(){
    super(props)
    this.state = {
      seltime: "",
    };
    this.update = this.update.bind(this);
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  };

  render() {
    let { closeModal, shop, meal } = this.props;
    let { seltime } = this.state;

    return (
      <div
        className="reserve-modal animated fadeInDown"
        onClick={e => e.stopPropagation()}
      >
        <img className="res-modal-img" src={meal.imageUrl} alt="" />
        <div className="res-modal-right">
          <div className="modal-top">
            <div>{meal.name.toUpperCase()}</div>
            <div onClick={closeModal} className="res-modal-x">
              &times;
            </div>
          </div>

          <div className="modal-desc">{meal.description}</div>
          <div className="modal-shop">{shop.name}</div>
          <div className="modal-loc">{shop.address}</div>

          <div className="res-modal-sel-btn">
            <select
              value={seltime}
              onChange={this.update("seltime")}
              className="modal-select-time"
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
                seltime === ""
                  ? "modal-reserve-btn time-not-selected"
                  : "modal-reserve-btn time-selected"
              }
              onClick={() => handleReserve(this.props, this.state)}
              id={`reserve-button`}
              disabled={seltime === ""}
            >
              RESERVE NOW
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    meal: ownProps.meal,
    shop: ownProps.shop,
    currentUser: state.entities.currentUser,
    resToday: state.ui.filters.restoday
  };
};

const mdp = dispatch => {
  return {
    openConfirmModal: () => dispatch(openModal({ type: "confirm" })),
    closeModal: () => dispatch(closeModal()),
    createReservation: res => dispatch(createReservation(res)),
    updateReservation: res => dispatch(updateReservation(res))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ReservationModal)
);
