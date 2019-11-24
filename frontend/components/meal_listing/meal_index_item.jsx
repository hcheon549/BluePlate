import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createReservation, updateReservation } from '../../actions/reservation_actions';
import { changeFilter } from '../../actions/filter_actions';
import { openModal } from '../../actions/modal_actions';
import { handleReserve } from "../../actions/reservation_actions";

const TIMES = ['11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM',
'12:00 PM - 12:30 PM','12:30 PM - 1:00 PM', '1:00 PM - 1:30 PM',
'1:30 PM - 2:00 PM','2:00 PM - 2:30 PM','2:30 PM - 3:00 PM',
'3:00 PM - 3:30 PM','3:30 PM - 4:00 PM','4:00 PM - 4:30 PM',
'4:30 PM - 5:00 PM'];

const TIMEVALS = ['11:00','11:30','12:00','12:30',
'13:00','13:30','14:00','14:30','15:00','15:30',
'16:00','16:30'];

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

  handleHover(shopId = null) {
    this.props.changeFilter("marker", shopId);
  }

  render() {
    let { menu, shop } = this.props;
    return (
      <div
        onMouseEnter={() => this.handleHover(shop.id)}
        onMouseLeave={() => this.handleHover()}
        className="meal-box"
      >

        <select
          value={this.state.seltime}
          onChange={this.update("seltime")}
          className="select-time"
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

        {/* <div className="meal-box-title">
          <span>LUNCH</span>
        </div> */}

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
