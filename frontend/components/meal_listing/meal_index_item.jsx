import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

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
    this.handleClick = this.handleClick.bind(this);
    this.trackAction = this.trackAction.bind(this);
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
        isPending: false
      })
    }
    this.props.changeFilter("marker", shopId);
  }

  trackAction(action){
    ReactGA.event({
      category: 'Demo Action',
      action: 'Demo user created an action.',
      label: action
    })
  }

  handleClick(){
    let { menu, shop, pickupTime, activeTab, todayReservations } = this.props;
    let {pickupTimeId} = this.state;
    let action = todayReservations[activeTab].id ? 'update' : 'reserve'
    let currentReservation = todayReservations[activeTab].id ? todayReservations[activeTab] : null;

    this.trackAction(action)
    this.props.openReserveModal(
      { action, menu, shop, pickupTime, pickupTimeId, currentReservation }
    )
  }

  render() {
    let { menu, pickupTime, activeTab, todayReservations } = this.props;
    let { isPending, pickupTimeId } = this.state;
    let shop = menu.shop;
    let soldOut = activeTab == 'lunch' ? (menu.lunchQuantityAvailable == 0) : (menu.dinnerQuantityAvailable == 0)
    let timeIntervals = pickupTime ? Object.values(pickupTime) : [];
    let actionText = (Object.values(todayReservations[activeTab]).length == 0 ? 'RESERVE' : 'UPDATE')
                    + (activeTab == 'lunch' ? ' LUNCH' : ' DINNER')
    let pickupTimeSelected = pickupTimeId !== null;

    let button = soldOut ? (
      <button
        className={"reserve-btn time-not-selected"}
        id={`reserve-button`}
        disabled={true}
      >
        Sold Out
      </button>
    ) : (
      <button
        className={
          (pickupTimeId === "")
            ? "reserve-btn time-not-selected"
            : ("reserve-btn time-selected" + (isPending ? " -pending" : ""))
        }
        onClick={this.handleClick}
        id={`reserve-button`}
        disabled={!pickupTimeSelected || isPending}
      >
        {!isPending && actionText}
      </button>
    )

    return (
      <div className="meal-box"
          onMouseEnter={() => this.handleHover(shop.id)}
          onMouseLeave={() => this.handleHover()}
      >

        {!soldOut && <select className="select-time" onChange={this.update("pickupTimeId")} value={pickupTimeId}>
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
        </select>}

        {button}

        <img alt="" src={menu.imageUrl} />

        {!soldOut && <div className="hidden-description">
          <ul>
            <li className="hidden-meal-name">{menu.name.toUpperCase()}</li>
            <li className="hidden-meal-desc">{menu.description}</li>
          </ul>
        </div>}

        {soldOut && <div className="soldout">
          <li>Sold Out</li>
        </div>}

        <div className="meal-box-description">
          <li className="tbd-item meal-name">{menu.name}</li>
          <li className="tbd-item shop-name">{shop.name}</li>
          <li className="tbd-item shop-address">{shop.address}</li>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todayReservations: state.entities.todayReservations,
    currentUser: state.entities.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirmModal: (data) => dispatch(openModal({ type: 'confirm' , data})),
    createReservation: (res) => dispatch(createReservation(res)),
    updateReservation: (res) => dispatch(updateReservation(res)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MealIndexItem));
