import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";

import {
  createReservation,
  updateReservation,
  deleteReservation,
  handleReserve
} from "../../actions/reservation_actions";
import { stringify } from "querystring";

const pickupTimeClose = {
  lunch: {
    hour: 10,
    minute: 30
  },
  dinner: {
    hour: 16,
    minute: 0
  }
}

class ReservationModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      pickupTimeId: this.props.data.pickupTimeId || ""
    };

    this.update = this.update.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
    this.refundable = this.refundable.bind(this);
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  };

  async handleReserve() {
    let { data: { action, menu, currentReservation }, currentUser, 
          updateReservation, createReservation, deleteReservation, openConfirmModal } = this.props;
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
    
    else if (action == 'update' && currentReservation) {
      let updatedReservation = Object.assign({}, currentReservation);
      updatedReservation.menuId = menu.id;
      updatedReservation.pickupTimeId = parseInt(pickupTimeId);
      debugger
      let updateResult = await updateReservation(updatedReservation)
      if (updateResult.reservation) {
        openConfirmModal()
      } else {
        console.log(updateResult)
      }
    }
    
    else if (action == 'cancel' && currentReservation){
      let cancellation = await deleteReservation(currentReservation.id)
      if (cancellation.reservation) {
        openConfirmModal()
      } else {
        console.log(cancellation)
      }
    }

    this.setState({
      isPending: false
    })
  };

  refundable(){
    let {data: {currentReservation: { pickupTime }}} = this.props
    const today = new Date()
    const thisHour = today.getHours();
    const thisMinute = today.getMinutes();

    return pickupTime.pickupType == 0
      ? ((thisHour < pickupTimeClose.lunch.hour) || ((thisHour == pickupTimeClose.lunch.hour) && (thisMinute <= pickupTimeClose.lunch.minute)))
      : ((thisHour < pickupTimeClose.dinner.hour) || ((thisHour == pickupTimeClose.dinner.hour) && (thisMinute <= pickupTimeClose.dinner.minute)))

  }

  render() {
    let { data: { action, menu, shop, pickupTime, currentReservation }, closeModal } = this.props;
    let { isPending, pickupTimeId } = this.state;
    let timeIntervals = pickupTime ? Object.values(pickupTime) : [];
    let actionText = action.toUpperCase();
    let pickingTimeOff, pickingClosingTime, warningMessage
    
    if (action == 'cancel'){
      pickingTimeOff = !this.refundable();
      pickingClosingTime = currentReservation.pickupTime.pickupType == 0
        ? `${pickupTimeClose.lunch.hour}:${pickupTimeClose.lunch.minute}AM`
        : `${pickupTimeClose.dinner.hour - 12}:${pickupTimeClose.dinner.minute}0PM` 
      warningMessage = `Your meal credit is not refundable for cancellations after ${pickingClosingTime}.`
    } else {
      pickingTimeOff = null;
      pickingClosingTime = null;
      warningMessage = null;
    }

    let actionButton = action == 'cancel' ? (
      <div className="select-button -cancellation">
        <button
          className={"modal-action" + (isPending ? " -pending" : "")}
          onClick={this.handleReserve}
          id={`reserve-button`}
          disabled={isPending}
          style={{marginLeft: 0}}
        >
          {!isPending && actionText}
        </button>
        {pickingTimeOff && 
          <div className="tinyText -warning">
            {warningMessage}
          </div>
        }
      </div>
    ) : (
      <React.Fragment>
        <li className="pickup-time">Select Pickup Time</li>
        <div className="select-button">
          <select 
            className="time-select"
            onChange={this.update("pickupTimeId")}
            defaultValue={pickupTimeId}
          >
            {timeIntervals.map((interval, idx) => {
              return (
                <option key={idx} value={interval.id}>
                  {interval.start + " - " + interval.end}
                </option>
              );
            })}
          </select>

          <button
            className={"modal-action" + (isPending ? " -pending" : "")}
            onClick={this.handleReserve}
            id={`reserve-button`}
            disabled={isPending}
          >
            {!isPending && actionText}
          </button>
        </div>
      </React.Fragment>
    )

    return (
      <div
        className="reserve-modal animated fadeInDown"
        onClick={e => e.stopPropagation()}
      >
        <img className="res-modal-img" src={menu.imageUrl} alt="" />
        <div className="res-modal-right">
          <div onClick={closeModal} className="res-modal-x">
            &times;
          </div>

          <div className="content-container-modal">
            <div className="reservation-content-modal">
              <li className="meal-name">{menu.name.toUpperCase()}</li>
              <li className="meal-description">{menu.description}</li>
              <li className="shop-name">{shop.name}</li>
              <li className="shop-address">{shop.address}</li>
            </div>

            {actionButton}

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
    deleteReservation: (id) => dispatch(deleteReservation(id)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationModal));
