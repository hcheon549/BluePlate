import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getDate } from '../const';
import { login } from '../../actions/session_actions';

const NavLogin = (props) => {
  let { history: { location, push } } = props
  let date = getDate()

  if (location.pathname == "/signup"){
    return <div />
  }

  return (
    <ul className="navLogin">
      <li className={"nav-menu-button miniText" + (location.pathname == '/updates' ? " -active" : "")} onClick={() => push('/updates')}>
        COVID-19 Updates
      </li>
      <li className={"nav-menu-button miniText" + (location.pathname == '/menu' ? " -active" : "")} key='all-meals' onClick={() => push('/menu')}>
        {date}'s menu
      </li>
      <li className={"nav-menu-button miniText" + (location.pathname == '/how-it-works' ? " -active" : "")} key='how-it-works' onClick={() => push('/how-it-works')}>
        How it works
      </li>
      <li className={"nav-menu-button miniText" + (location.pathname == '/login' ? " -active" : "")} key='login' onClick={() => push('/login')}>
        Log in
      </li>
      <li className="nav-menu-button miniText" key='signup' >
        <div className="signup-button" onClick={() => push('/signup')}>
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