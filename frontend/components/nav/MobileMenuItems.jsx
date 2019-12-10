import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import { toggleBurger } from '../../actions/burger_actions'

class MobileMenuItems extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    let { history: { location, push }, burger } = this.props
    // let navSelect = (props.loggedIn && props.location.pathname !== '/demo') ? <MenuItem {...props} /> : <NavLogin {...props} />
    
    return (
      <div className={"mobileMenu" + (burger ? ' -open' : '')}>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  let { currentUser } = state.entities

  return {
    stepJoin: state.ui.stepJoin || null,
    isVisitor: currentUser && currentUser.policyType == "Visitor",
    isLead: currentUser && currentUser.policyType == "Lead",
    isMember: currentUser && currentUser.policyType == "Member",
    loggedIn: Boolean(state.session.id),
    burger: state.ui.burger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    toggleBurger: () => dispatch(toggleBurger())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileMenuItems));
