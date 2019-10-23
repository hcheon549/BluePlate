import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login, demo } from '../../actions/session_actions';

class NavLogin extends React.Component {
  render() {
    return (
      <ul className="navLogin">
        <li key='signup'>
          <div className="signup-button">
            <Link to='/users/signup'>GET STARTED</Link>
          </div>
        </li>
        <li key='login'>
          <Link to='/users/login'>LOG IN</Link>
        </li>
      </ul>
    );
  }
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