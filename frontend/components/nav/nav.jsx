import React from 'react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../../util/route_util';

const Nav = () => (
  <div className="shadow">
    <div className="nav-main content -siteWidth">
      <div className="navLogo">
        <Link to="/">
          <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span><strong>BLUE</strong>PLATE</span>
        </Link>
      </div>

      <div className="nav-route">
        <NavRoute />
      </div>
    </div>
    </div>
);

export default Nav;
