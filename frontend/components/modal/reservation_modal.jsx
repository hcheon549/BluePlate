import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";

import {
  createReservation,
  updateReservation,
  handleReserve
} from "../../actions/reservation_actions";

class ReservationModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      pickupTimeId: this.props.data.pickupTimeId || ""
    };

    this.update = this.update.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  };

  async handleReserve() {
    let { data: { action, menu }, currentUser, updateReservation, createReservation, openConfirmModal } = this.props;
    let { pickupTimeId } = this.state

    this.setState({
      isPending: true,
    })

    window.scrollTo(0, 0);

    if (action == 'reserve'){
      let newReservation = {
        userId: currentUser.id,
        menuId: menu.id,
        pickupTimeId: parseInt(pickupTimeId)
      };
      let reservationResult = await createReservation(newReservation)
      if (reservationResult.reservation) {
        openConfirmModal()
      } else {
        console.log(reservationResult)
      }
    }
    
    // else if (action == 'update') {
    //   let updatedReservation = Object.assign({}, todayReservations[activeTab]);
    //   updatedReservation.menuId = menu.id;
    //   updatedReservation.pickupTimeId = parseInt(pickupTimeId);
  
    //   let updateResult = await updateReservation(updatedReservation)
    //   if (updateResult.reservation) {
    //     openConfirmModal()
    //   } else {
    //     console.log(updateResult)
    //   }
    // }
    
    // else if (action == 'cancel'){
    //   //cancel reservation here
    // }

    this.setState({
      isPending: false
    })
  };

  render() {
    let { data: { action, menu, shop, pickupTime }, closeModal } = this.props;
    let { isPending, pickupTimeId } = this.state;
    let timeIntervals = pickupTime ? Object.values(pickupTime) : [];
    let actionText = action.toUpperCase();
    let pickupTimeSelected = pickupTimeId !== null;

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
              className="select-time"
              onChange={this.update("pickupTimeId")}
              defaultValue={pickupTimeId}
            >
              <option hidden value={null}>
                Pickup Time
              </option>
              {timeIntervals.map((interval, idx) => {
                return (
                  <option key={idx} value={interval.id}>
                    {interval.start + " - " + interval.end}
                  </option>
                );
              })}
            </select>

            <button
              className={
                (pickupTimeId === "")
                  ? "reserve-btn time-not-selected"
                  : ("reserve-btn time-selected" + (isPending ? " -pending" : ""))
              }
              onClick={this.handleReserve}
              id={`reserve-button`}
              disabled={!pickupTimeSelected || isPending}
            >
              {!isPending && actionText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirmModal: () => dispatch(openModal({ type: 'confirm' })),
    createReservation: (res) => dispatch(createReservation(res)),
    updateReservation: (res) => dispatch(updateReservation(res)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationModal));
