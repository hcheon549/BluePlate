import React from 'react';

const DropdownMenu = (props) => {
  if (!props.isMember){
    return (
      <ul className={props.active ? "dropdown-active animated fadeIn" : "dropdown animated" }>
        <li onClick={() => props.history.push("/users/signup")}>
          <div>
            Finish Enrollment
          </div>
        </li>
      </ul>
      )
  }

  return (
    <ul className={props.active ? "dropdown-active animated fadeIn" : "dropdown animated" }>
      <li onClick={() => props.history.push("/my-meals")}>
        <div>
          <img src="https://res.cloudinary.com/mwojick/image/upload/v1528591565/TreatPal/icons/Moon-512.png" alt="" />
          Today's Menu
        </div>
      </li>

      <li onClick={() => props.history.push("/account")}>
        <div>
          <img src="https://res.cloudinary.com/mwojick/image/upload/v1533677351/TreatPal/icons/profile2.png" alt="" />
          My Account
        </div>
      </li>

      {/* <li onClick={() => props.history.push("/favorites")}>
        <div>
          <img src="https://res.cloudinary.com/mwojick/image/upload/v1532988683/TreatPal/icons/favorite2.png" alt="" />
          Favorites
        </div>
      </li> */}

      <li onClick={() => props.history.push("/history")}>
        <div>
          <img src="https://res.cloudinary.com/mwojick/image/upload/v1533677351/TreatPal/icons/history2.png" alt="" />
          History
        </div>
      </li>

      <li onClick={props.handleLogout} className="menu-logout">
        <div>
          <img src="https://res.cloudinary.com/mwojick/image/upload/v1528590545/TreatPal/icons/logout.png" alt="" />
          Logout
        </div>
      </li>
    </ul>
  )
};

export default DropdownMenu;
