import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavLogin from "../components/nav/nav_login";
import Menu from "../components/nav/menu";

const Auth = ({ component: Component, path, loggedIn, isVisitor, isLead, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (!loggedIn || isVisitor) ? <Component {...props} /> : <Redirect to="/my-meals" />
  )}/>
);

const Protected = ({ component: Component, path, loggedIn, isVisitor, isLead, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (!loggedIn || isVisitor) ? <Redirect to="/users/signup" /> : <Component {...props} />)
  }/>
);

//custom route for nav bar (display menu or login/signup button)
const Nav = ({ path, loggedIn, isVisitor, isLead, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (!loggedIn || isVisitor) ? <NavLogin {...props} /> : <Menu {...props} />
  )}/>
);

const mapStateToProps = state => {
  let { currentUser } = state.entities
  return { 
    isVisitor: currentUser && currentUser.policyType == "Visitor",
    isLead: currentUser && currentUser.policyType == "Lead",
    isMember: currentUser && currentUser.policyType == "Member",
    loggedIn: Boolean(state.session.id),
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const NavRoute = withRouter(connect(mapStateToProps, null)(Nav));
