import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";

import {
  createReservation,
  updateReservation,
  handleReserve
} from "../../actions/reservation_actions";

const TIMES = ['11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM',
'12:00 PM - 12:30 PM','12:30 PM - 1:00 PM', '1:00 PM - 1:30 PM',
'1:30 PM - 2:00 PM','2:00 PM - 2:30 PM','2:30 PM - 3:00 PM',
'3:00 PM - 3:30 PM','3:30 PM - 4:00 PM','4:00 PM - 4:30 PM',
'4:30 PM - 5:00 PM'];

const TIMEVALS = ['11:00','11:30','12:00','12:30',
'13:00','13:30','14:00','14:30','15:00','15:30',
'16:00','16:30'];


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
    let { closeModal, shop, menu } = this.props;
    let { seltime } = this.state;

    return (
      <div
        className="reserve-modal animated fadeInDown"
        onClick={e => e.stopPropagation()}
      >
        <img className="res-modal-img" src={menu.imageUrl} alt="" />
        <div className="res-modal-right">
          <div className="modal-top">
            <div>{menu.name.toUpperCase()}</div>
            <div onClick={closeModal} className="res-modal-x">
              &times;
            </div>
          </div>

          <div className="modal-desc">{menu.description}</div>
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
              {TIMEVALS.map((tv, idx) => {
                return (
                  <option key={idx} value={tv}>
                    {TIMES[idx]}
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
    menu: ownProps.menu,
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
