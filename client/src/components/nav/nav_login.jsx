import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login, demo } from '../../actions/session_actions';

class NavLogin extends React.Component {
  render() {
    return (
      <div className="nav-login">
        {this.props.authAction}

        <div className="demo-button" onClick={() => this.props.demo()}>
          DEMO
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let authAction = ownProps.location.pathname === '/signup' ? <Link to='/login'>LOG IN</Link> : <Link to='/signup'>SIGN UP</Link>;
  return { authAction };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    demo: () => dispatch(demo())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLogin));