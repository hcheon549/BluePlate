import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createReservation, updateReservation } from '../../actions/reservation_actions';
import { changeFilter } from '../../actions/filter_actions';
import { openModal } from '../../actions/modal_actions';

class MealIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      pickupTimeId: ""
    };

    this.update = this.update.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
  }

  update(type) {
    return e =>
      this.setState({
        [type]: e.currentTarget.value
      });
  }

  handleHover(shopId = null) {
    if (!shopId){
      this.setState({
        pickupTimeId: "",
        isPending: false
      })
    }
    this.props.changeFilter("marker", shopId);
  }

  async handleReserve() {
    let { resToday, menu, currentUser, updateReservation, createReservation, openConfirmModal } = this.props;
    let { pickupTimeId } = this.state

    this.setState({
      isPending: true,
    })

    window.scrollTo(0, 0);

    if (resToday.constructor !== Array) {
      let updatedReservation = Object.assign({}, resToday);
      updatedReservation.menuId = menu.id;
      updatedReservation.pickupTimeId = parseInt(pickupTimeId);
  
      let updateResult = await updateReservation(updatedReservation)
      if (updateResult.reservation) {
        openConfirmModal()
      } else {
        console.log(updateResult)
      }
    } else {
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
    this.setState({
      isPending: false
    })
  };
  

  render() {
    let { menu, shop, pickupTime, activeTab } = this.props;
    let { isPending, pickupTimeId } = this.state;
    let timeIntervals = pickupTime ? Object.values(pickupTime) : [];
    let actionButton = activeTab == 'lunch' ? 'RESERVE LUNCH' : 'RESERVE DINNER';
    let pickupTimeSelected = pickupTimeId !== null;

    return (
      <div className="meal-box"
          onMouseEnter={() => this.handleHover(shop.id)}
          onMouseLeave={() => this.handleHover()}
      >

        <select className="select-time" onChange={this.update("pickupTimeId")} value={pickupTimeId}>
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
          {!isPending && actionButton}
        </button>

        <img alt="" src={menu.imageUrl} />

        <div className="hidden-description">
          <ul>
            <li className="hidden-meal-name">{menu.name.toUpperCase()}</li>
            <li className="hidden-meal-desc">{menu.description}</li>
          </ul>
        </div>

        <div className="meal-box-description">
          <li className="tbd-item meal-name">{menu.name}</li>
          <li className="tbd-item shop-name">{shop.name}</li>
          <li className="tbd-item shop-address">{shop.address}</li>
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

const mdp = (dispatch) => {
  return {
    openConfirmModal: () => dispatch(openModal({ type: 'confirm' })),
    createReservation: (res) => dispatch(createReservation(res)),
    updateReservation: (res) => dispatch(updateReservation(res)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default withRouter(connect(msp, mdp)(MealIndexItem));
