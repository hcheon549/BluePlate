import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import NavLogin from "./NavLogin";
import Menu from "./Menu";
import StepIndicator from './StepIndicator'

const Nav = (props) => {
  return (
  <div className="shadow">
    <div className="nav-main content -siteWidth">
      <div className="navLogo">
        <Link to="/">
          <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span><strong>BLUE</strong>PLATE</span>
        </Link>
      </div>
      {props.location.pathname === "/users/signup" && <StepIndicator activeStep={props.stepJoin}/>}
      {props.location.pathname !== "/users/signup" && <div className="nav-route">
        <NavOption {...props}/>
      </div>}
    </div>
    </div>
    )
};

const NavOption = (props) => (
  (!props.loggedIn) ? <NavLogin {...props} /> : <Menu {...props} />
)

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
