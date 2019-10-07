import React from 'react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../../util/route_util';

const Nav = () => (
  <div className="nav-main">
    <div className="nav-logo">
      <Link to="/">
        <span><strong>BLUE</strong>PLATE</span>
      </Link>
    </div>

    <div className="nav-route">
      <NavRoute />
    </div>

  </div>
);

export default Nav;
