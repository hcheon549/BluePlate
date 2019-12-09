import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import NavLogin from "./NavLogin";
import MenuItem from "./MenuItem";
import StepIndicator from './StepIndicator'

const Nav = (props) => {
  let navSelect = props.location.pathname === "/users/signup" ? (
    <StepIndicator activeStep={props.stepJoin}/>
  ) : (props.loggedIn && props.location.pathname !== '/demo') ? (
    <div className="nav-route">
      <MenuItem {...props} />
    </div>
  ) : (
    <div className="nav-route">
      <NavLogin {...props} />
    </div>
  )

  return (
  <div className="shadow">
    <div className="nav-main content -siteWidth">
      <div className="navLogo">
        <Link to="/">
          <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span className="theLogo">BluePlattr</span>
        </Link>
      </div>
      {navSelect}
    </div>
    </div>
    )
};

const mapStateToProps = state => {
  let { currentUser } = state.entities

  return {
    stepJoin: state.ui.stepJoin || null,
    isVisitor: currentUser && currentUser.policyType == "Visitor",
    isLead: currentUser && currentUser.policyType == "Lead",
    isMember: currentUser && currentUser.policyType == "Member",
    loggedIn: Boolean(state.session.id),
  };
};

export default withRouter(connect(mapStateToProps)(Nav));
