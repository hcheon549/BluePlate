import React from "react";

const ReservationItem = (props) => {

  let { type, hasMeal, menu } = props;

  if (!hasMeal){
    return <div />
  }

  return (
    <div className="reservation-box">
      <img alt="" src={menu.meal.imageUrl} />
      <div className="reservation-content">
        <ul>
          <li className="meal-name">{menu.meal.name}</li>
          <li className="shop-name">{menu.shop.name}</li>
          <li className="shop-address">{menu.shop.address}</li>
          <li calssName="pickup-time">Pick up between {menu.pickupTime.start} and {menu.pickupTime.end}</li>
        </ul>
      </div>
    </div>

  )
}

export default ReservationItem