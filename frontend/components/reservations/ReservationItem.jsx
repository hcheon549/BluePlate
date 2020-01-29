import React from "react";
import moment from 'moment';

const ReservationItem = (props) => {

  let { type, hasMeal, reservation, pickupTime, openReserveModal } = props;
  let imageUrl, content;
  let currentHour = moment().hour();

  let canUpdate = type == "lunch" ? (currentHour < 10) : (currentHour < 16)
  console.log(moment())
  console.log(currentHour)
  let data = {
    menu: {...reservation.menu, meal: {...reservation.meal}},
    shop: reservation.shop,
    pickupTime: pickupTime,
    pickupTimeId: reservation.pickupTimeId,
    currentReservation: reservation
  }

  if (hasMeal){
    imageUrl = reservation.meal.imageUrl;
    content = (
      <ul>
        <li className="meal-name">{reservation.meal.name}</li>
        <li className="shop-name">{reservation.shop.name}</li>
        <li className="shop-address">{reservation.shop.address}</li>
        <li className="pickup-time">Pick up between {reservation.pickupTime.start} and {reservation.pickupTime.end}</li>
        <li style={{display: 'flex', justifyContent: 'left'}}>
          {canUpdate && <span style={{marginRight: '20px'}} onClick={() => openReserveModal({ action: 'update', ...data})}>Update</span>}
          <span onClick={() => openReserveModal({action: 'cancel', ...data})}>Cancel</span>
        </li>
      </ul>
    )
  } else {
    imageUrl = "https://blueplate-development.s3.amazonaws.com/logo_gray.png";
    content = (
      <ul>
        <li className="no-meal">You have not selected your {type} yet</li>
      </ul>
    )
  }

  return (
    <div className="reservation-box">
      <div className="order-label">
        <li style={{textTransform: 'capitalize'}}>{type}</li>
      </div>
      <div className="image-container">
        <img alt="" src={imageUrl} />
      </div>
      <div className="reservation-content">
        {content}
      </div>
    </div>
  )
}

export default ReservationItem