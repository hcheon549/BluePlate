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
    let { data: { action, menu, currentReservation }, currentUser, 
          updateReservation, createReservation, openConfirmModal } = this.props;
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

            <li className="pickup-time">Select Pickup Time</li>
            <div className="select-button">
              <select 
                className="time-select"
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
                className={"reserve-button time-selected" + (isPending ? " -pending" : "")}
                onClick={this.handleReserve}
                id={`reserve-button`}
                disabled={isPending}
              >
                {!isPending && actionText}
              </button>
            </div>
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
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationModal));
