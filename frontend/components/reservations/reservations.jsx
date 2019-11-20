import React from "react";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateReservation, deleteReservation } from '../../actions/reservation_actions';
import { getSchoolReservations, getPastFive } from '../../util/selectors';
import { changeFilter } from '../../actions/filter_actions';
import { times, timeVals } from "../../util/time_vars.js";

class Reservations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resTime: this.props.resTime
    };
  }

  componentDidMount() {
    if (this.props.reservations[0].constructor !== Array) {
      this.props.changeFilter("restoday", this.props.reservations[0]);
    } else {
      this.props.changeFilter("restoday", []);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.resTime !== newProps.reservations[0].time) {
      this.setState({ resTime: newProps.reservations[0].time });
    }

    if (
      this.props.reservations[0].constructor === Array &&
      newProps.reservations[0].constructor !== Array
    ) {
      this.props.changeFilter("restoday", newProps.reservations[0]);
    }
  }

  updateRes(e) {
    let newRes = Object.assign({}, this.props.reservations[0]);
    newRes.time = e.currentTarget.value;
    newRes.menuId = this.props.reservations[0].menuId;
    this.props.updateReservation(newRes);
  }

  render() {
    let { reservations, menus, shops } = this.props;

    let mins = new Date(Date.parse(this.state.resTime)).getMinutes();
    let hrs = new Date(Date.parse(this.state.resTime)).getHours();

    let minutes = "00";
    if (mins.toString().length > 1) {
      minutes = mins;
    }

    let selResTime = `${hrs}:${minutes}`;

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let fiveDays = [];
    let day = new Date().getDay() - 4 + 7 + 1;
    for (let i = 0; i < 5; i++) {
      fiveDays.push(days[day % 7]);
      day++;
    }

    let savings = 0;
    reservations.forEach(res => {
      if (res.length === 0) {
      } else {
        savings = savings + menus[res.menuId].price - 3;
      }
    });

    return (
      <div className="reservations-component">
        <div className="res-items">
          {reservations
            .slice(1)
            .reverse()
            .map((res, id) => {
              if (res.length === 0) {
                return (
                  <div key={id} className="res-nonresed hidden-res">
                    <div className="day-of-week">{fiveDays[id]}</div>
                    <div className="no-meal-this-day">
                      You didn't have a meal on this day.
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={id} className="res-resed hidden-res">
                    <div className="day-of-week">{fiveDays[id]}</div>

                    <img
                      src={menus[res.menuId].imageUrl}
                      className="resed-img"
                      alt=""
                    />

                    <div className="meal-you-had">
                      You had {shops[menus[res.menuId].shopId].name} on{" "}
                      {fiveDays[id]}
                    </div>
                  </div>
                );
              }
            })}

          <div className="res-resed">
            {reservations
              .slice()
              .reverse()
              .slice(-1)
              .map((res, id) => {
                if (res.length === 0) {
                  return (
                    <div key={id} className="not-resed-today">
                      <div className="day-of-week">{fiveDays.slice(-1)[0]}</div>
                      <div className="no-meal-this-day">
                        Try something new today!
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={id} className="resed-today">
                      <div className="day-of-week">{fiveDays.slice(-1)[0]}</div>

                      <ul className="resed-today-desc">
                        <li className="resed-today-desc1">
                          {menus[res.menuId].name}
                        </li>
                        <li className="resed-today-desc2">
                          {shops[menus[res.menuId].shopId].name}
                        </li>
                        <li className="resed-today-desc3">
                          {shops[menus[res.menuId].shopId].address}
                        </li>
                      </ul>

                      <img
                        className="resed-img-today"
                        src={menus[res.menuId].imageUrl}
                        alt=""
                      />

                      <select
                        className="update-res"
                        value={selResTime}
                        onChange={e => this.updateRes(e)}
                      >
                        {timeVals.map((tv, idx) => {
                          return (
                            <option key={idx} value={tv}>
                              {times[idx]}
                            </option>
                          );
                        })}
                      </select>

                      <div
                        className="cancel-reservation"
                        onClick={() => this.props.deleteReservation(res.id)}
                      >
                        Cancel
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <div className="res-savings">
            <li className="sav-holy">Holy cow!</li>
            <li className="sav-est">You'll be saving an estimated</li>
            <li className="sav-num">${savings.toFixed(2)}</li>
            <li className="sav-week">on meals this week!</li>
          </div>
        </div>
      </div>
    );
  }
}


const msp = ({entities: {currentUser, menuRes, shopRes, reservations}, session}) => {

  let schoolReservations = getSchoolReservations(reservations, menuRes, true);
  schoolReservations = schoolReservations.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });

  let pastFive = [[],[],[],[],[]];
  //get the reservations for the past 5 days
  //(including tomorrow) if there are any. if not, put blank.

  if (schoolReservations.length !== 0) {
    pastFive = getPastFive(schoolReservations);
  }

  let resTime =[];
  if (pastFive.length !== 0 ) {
    if (pastFive[0].length !== 0) {
      resTime = pastFive[0].time;
    }
  }

  return {
    currentUser,
    reservations: pastFive,
    menus: menuRes,
    shops: shopRes,
    resTime: resTime
  };
};

const mdp = (dispatch) => {
  return {
    updateReservation: (res) => dispatch(updateReservation(res)),
    deleteReservation: (id) => dispatch(deleteReservation(id)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default withRouter(connect(msp, mdp)(Reservations));