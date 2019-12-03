import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login, demo } from '../../actions/session_actions';

const NavLogin = (props) => {
  let { history: { location, push } } = props
  if (location.pathname == "/users/signup"){
    return <div />
  }

  return (
    <ul className="navLogin">
      <li className={"nav-menu-button miniText" + (location.pathname == '/all-meals' ? " -active" : "")} key='all-meals' onClick={() => push('/all-meals')}>
        View meals
      </li>
      <li className={"nav-menu-button miniText" + (location.pathname == '/users/login' ? " -active" : "")} key='login' onClick={() => push('/users/login')}>
        Log in
      </li>
      <li className="nav-menu-button miniText" key='signup' >
        <div className="signup-button" onClick={() => push('/users/signup')}>
          Get started
        </div>
      </li>
    </ul>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { 
    pathname: ownProps.location.pathname 
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLogin));