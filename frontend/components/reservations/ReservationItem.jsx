import React from "react";

const ReservationItem = (props) => {

  let { type, hasMeal, menu } = props;

  if (!hasMeal){
    return <div />
  }
  
  return (
    <div className="meal-box">
      <img alt="" src={menu.meal.imageUrl} />

      <div className="hidden-description">
        <ul>
          <li className="hidden-meal-name">{menu.meal.name.toUpperCase()}</li>
          <li className="hidden-meal-desc">{menu.meal.description}</li>
        </ul>
      </div>

      <div className="meal-box-description">
        <li className="tbd-item meal-name">{menu.meal.name}</li>
        <li className="tbd-item shop-name">{menu.shop.name}</li>
        <li className="tbd-item shop-address">{menu.shop.address}</li>
      </div>
    </div>

  )
}

export default ReservationItem