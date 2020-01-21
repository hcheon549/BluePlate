import React from "react";

import ReservationItem from './ReservationItem'

const TodayReservations = (props) => {
  let { todayReservations, lunchTime, dinnerTime, openReserveModal } = props;
  let hasLunch = Object.values(todayReservations.lunch).length !== 0
  let hasDinner = Object.values(todayReservations.dinner).length !== 0

  return (
    <div className="reservations">
      <h4>Your Reservations</h4>
      <div className="reservations-container">
        <ReservationItem 
          type={"lunch"}
          hasMeal={hasLunch}
          reservation={todayReservations.lunch}
          openReserveModal={openReserveModal}
          pickupTime={lunchTime}
        />
        <ReservationItem
          type={"dinner"}
          hasMeal={hasDinner}
          reservation={todayReservations.dinner}
          openReserveModal={openReserveModal}
          pickupTime={dinnerTime}
        />
      </div>
    </div>
  )
}

export default TodayReservations
