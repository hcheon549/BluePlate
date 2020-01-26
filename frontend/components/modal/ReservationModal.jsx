import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';

import { openModal, closeModal } from "../../actions/modal_actions";

import {
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../actions/reservation_actions";

const pickupTimeClose = {
  lunch: {
    hour: 10,
    minute: 0
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

  openSwal(action){
    let message, subMessage;
    switch(action){
      case 'reserve':
        message = 'Reserved';
        subMessage = 'Your reservation is received. Be ready to pick up!';
        break;
      case 'update':
        message = 'Updated';
        subMessage = 'Your reservation is updated!';
        break;
      case 'cancel':
        message = 'Cancelled';
        subMessage = 'Your reservation is cancelled';
        break;
      default:
    }
    swal(`${message}!`, `${subMessage}`, "success");
  }

  async handleReserve() {
    let { data: { action, menu, currentReservation }, currentUser, 
          updateReservation, createReservation, deleteReservation, openConfirmModal, closeModal } = this.props;
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
      this.setState({
        isPending: false
      })  
      if (reservationResult.reservation) {
        openConfirmModal({
          action,
          code: reservationResult.reservation.pickupCode,
        })
      } else {
        console.log(reservationResult)
      }
      // else if (reservationResult.errors) {
      //   openConfirmModal({ action: 'create-error',})
      // } 
    }
    
    else if (action == 'update' && currentReservation) {
      let updatedReservation = Object.assign({}, currentReservation);
      updatedReservation.menuId = menu.id;
      updatedReservation.pickupTimeId = parseInt(pickupTimeId);

      let updateResult = await updateReservation(updatedReservation)
      this.setState({
        isPending: false
      })  
      if (updateResult.reservation) {
        openConfirmModal({
          action,
          code: updateResult.reservation.pickupCode,
        })
        // this.openSwal(action)
        // closeModal();
      } else {
        console.log(updateResult)
      }
      // else if (updateResult.errors) {
      //   openConfirmModal({ action: 'update-error',})
      // }
      
    }
    
    else if (action == 'cancel' && currentReservation){
      let cancellation = await deleteReservation(currentReservation.id)
      this.setState({
        isPending: false
      })  
      if (cancellation.reservation) {
        openConfirmModal({
          action,
        })
        // this.openSwal(action)
        // closeModal();
      } else {
        console.log(cancellation)
      }
    }
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
    let pickingTimeOff, pickingClosingTime, warningMessage

    const today = new Date()
    const thisHour = today.getHours();

    let timeIntervals = pickupTime ? thisHour < 21 ? Object.values(pickupTime).filter((time) => {
      let type = (time.end.slice(time.end.length - 2, time.end.length));
      let hour = type == 'AM' ? parseInt(time.end.slice(0, 2)) : (parseInt(time.end.slice(0, 2)) + 12)
      return hour > thisHour
    }) : Object.values(pickupTime) : [];
    let actionText = action.toUpperCase();
    
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
        <img className="res-modal-img" src={menu.meal.imageUrl} alt="" />
        <div className="res-modal-right">
          <div onClick={closeModal} className="res-modal-x">
            &times;
          </div>

          <div className="content-container-modal">
            <div className="reservation-content-modal">
              <li className="meal-name">{menu.meal.name.toUpperCase()}</li>
              <li className="meal-description">{menu.meal.description}</li>
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
    openConfirmModal: (data) => dispatch(openModal({ type: 'confirm', data})),
    createReservation: (res) => dispatch(createReservation(res)),
    updateReservation: (res) => dispatch(updateReservation(res)),
    deleteReservation: (id) => dispatch(deleteReservation(id)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationModal));
