import React from "react";

import ReservationItem from './ReservationItem'

const TodayReservations = (props) => {
  let { todayReservations } = props;
  let hasLunch = Object.values(todayReservations.lunch).length !== 0
  let hasDinner = Object.values(todayReservations.dinner).length !== 0

  return (
    <div className="reservations-container">
      <ReservationItem 
        type={"lunch"}
        hasMeal={hasLunch}
        menu={todayReservations.lunch}
      />
      <ReservationItem
        type={"dinner"}
        hasMeal={hasDinner}
        menu={todayReservations.dinner}
      />
    </div>
  )
}

export default TodayReservations
