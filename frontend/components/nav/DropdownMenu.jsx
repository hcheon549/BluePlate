import React from 'react';

const DropdownMenu = (props) => {
  if (!props.isMember){
    return (
      <ul className={props.active ? "dropdown-active animated fadeIn" : "dropdown animated" }>
        <li className="nav-menu-button miniText" onClick={() => props.history.push("/users/signup")}>
            Finish Enrollment
        </li>
      </ul>
      )
  }

  return (
    <ul className={props.active ? "dropdown-active animated fadeIn" : "dropdown animated" }>
      <li className="nav-menu-button miniText" onClick={() => props.history.push("/my-meals")}>
        Today's Menu
      </li>

      <li className="nav-menu-button miniText" onClick={() => props.history.push("/account")}>
        My Account
      </li>

      {/* <li onClick={() => props.history.push("/favorites")}>
        <div>
          <img src="https://res.cloudinary.com/mwojick/image/upload/v1532988683/TreatPal/icons/favorite2.png" alt="" />
          Favorites
        </div>
      </li> */}

      <li className="nav-menu-button miniText" onClick={() => props.history.push("/history")}>
        Order History
      </li>

      <li className="nav-menu-button miniText" onClick={props.handleLogout} >
        Logout
      </li>
    </ul>
  )
};

export default DropdownMenu;
