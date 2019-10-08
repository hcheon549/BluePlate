import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login, demo } from '../../actions/session_actions';

class NavLogin extends React.Component {
  render() {
    return (
      <div className="nav-login">
        {this.props.logInSignUp}

        <div className="demo-button" onClick={() => this.props.demo()}>
          DEMO
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  let logInSignUp;
  if (ownProps.location.pathname === '/signup') {
    logInSignUp = <Link to='/login'>LOG IN</Link>;
  } else {
    logInSignUp = <Link to='/signup'>SIGN UP</Link>;
  }

  return {
    logInSignUp: logInSignUp
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    demo: () => dispatch(demo())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLogin));