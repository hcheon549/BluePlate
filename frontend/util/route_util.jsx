import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ADMIN_ACCOUNT = [
  "eric@blueplattr.com",
  "ben@blueplattr.com",
  "support@blueplattr.com",
  "hello@blueplattr.com",
  "echeon1122@gmail.com"
]

const Auth = ({ component: Component, path, loggedIn, isVisitor, isLead, isMember, exact, }) => {
  return (
  <Route path={path} exact={exact} render={props => 
    (!loggedIn || isVisitor) ? <Component {...props} /> : <Redirect to="/my-meals" />
  }/>
)};

const Protected = ({ component: Component, path, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => (
    (!isMember) ? <Redirect to="/" /> : <Component {...props} />)
  }/>
);

const Authenticated = ({ component: Component, path, isMember, exact }) => (
  <Route path={path} exact={exact} render={props => 
    (isMember) ? <Redirect to="/my-meals" /> : <Component {...props} />
  }/>
);

const Admin = ({ component: Component, path, isAdmin, exact }) => (
  <Route path={path} exact={exact} render={props => 
    (isAdmin) ?  <Component {...props} /> : <Redirect to="/" />
  }/>
);


const mapStateToProps = state => {
  let { currentUser } = state.entities
  // Match with the entities.plans
  return {
    isVisitor: currentUser && currentUser.policyType == "Visitor",
    isLead: currentUser && currentUser.policyType == "Lead",
    isMember: currentUser && currentUser.policyType == "Member",
    isAdmin: currentUser && currentUser.policyType == "Member" && ADMIN_ACCOUNT.includes(currentUser.email),
    loggedIn: Boolean(state.session.id),
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const AuthenticatedRoute = withRouter(connect(mapStateToProps, null)(Authenticated));
export const AdminRoute = withRouter(connect(mapStateToProps, null)(Admin));
