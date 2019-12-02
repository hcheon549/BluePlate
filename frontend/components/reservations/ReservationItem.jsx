import React from "react";

const ReservationItem = (props) => {

  let { type, hasMeal, menu } = props;
  let imageUrl, content;

  if (hasMeal){
    imageUrl = menu.meal.imageUrl;
    content = (
      <ul>
        <li className="meal-name">{menu.meal.name}</li>
        <li className="shop-name">{menu.shop.name}</li>
        <li className="shop-address">{menu.shop.address}</li>
        <li calssName="pickup-time">Pick up between {menu.pickupTime.start} and {menu.pickupTime.end}</li>
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