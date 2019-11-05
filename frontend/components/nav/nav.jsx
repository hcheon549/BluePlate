import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavRoute } from '../../util/route_util';

import StepIndicator from '../element/StepIndicator';

const Nav = ({location, stepJoin}) => (
  <div className="shadow">
    <div className="nav-main content -siteWidth">
      <div className="navLogo">
        <Link to="/">
          <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span><strong>BLUE</strong>PLATE</span>
        </Link>
      </div>
      {location === "/users/signup" && <StepIndicator activeStep={stepJoin}/>}
      {location !== "/users/signup" && <div className="nav-route">
        <NavRoute />
      </div>}
    </div>
    </div>
);

const mapStateToProps = state => {
  return {
    stepJoin: state.ui.stepJoin || null
  };
};

export default connect(mapStateToProps)(Nav);
