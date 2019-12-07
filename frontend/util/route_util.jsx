import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({ component: Component, path, loggedIn, isVisitor, isLead, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (!loggedIn || isVisitor) ? <Component {...props} /> : <Redirect to="/my-meals" />
  )}/>
);

const Protected = ({ component: Component, path, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (!isMember) ? <Redirect to="/" /> : <Component {...props} />)
  }/>
);

const Authenticated = ({ component: Component, path, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (isMember) ? <Redirect to="/my-meals" /> : <Component {...props} />)
  }/>
);


const mapStateToProps = state => {
  let { currentUser } = state.entities
  // Match with the entities.plans
  return { 
    isVisitor: currentUser && currentUser.policyType == "Visitor",
    isLead: currentUser && currentUser.policyType == "Lead",
    isMember: currentUser && currentUser.policyType == "Member",
    loggedIn: Boolean(state.session.id),
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const AuthenticatedRoute = withRouter(connect(mapStateToProps, null)(Authenticated));
