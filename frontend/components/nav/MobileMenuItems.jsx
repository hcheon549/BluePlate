import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import { toggleBurger } from '../../actions/burger_actions'

class MobileMenuItems extends React.Component {
  constructor(props){
    super(props)
  }

  nextAction(path){
    if (this.props.burgerOpen){
      this.props.toggleBurger();
    }
    this.props.history.push(path)
  }

  handleLogout() {
    if (this.props.burgerOpen){
      this.props.toggleBurger();
    }
    this.props.logout();
    window.location.replace('/');
  }

  render(){
    let { history: { location }, burgerOpen, logout } = this.props;
    let navSelect = (this.props.loggedIn) 
    ? (
      <ul className="navMenu">
        {this.props.isMember && <li className={"mobile-menu-button" + (location.pathname == '/my-meals' ? " -active" : "")} onClick={this.nextAction.bind(this, '/my-meals')}>
          View meals
        </li>}
        {this.props.isMember && <li className={"mobile-menu-button" + (location.pathname == '/my-meals' ? " -active" : "")} onClick={this.nextAction.bind(this, '/account')}>
          My account
        </li>}
        {!this.props.isMember && <li className="mobile-menu-button" onClick={this.nextAction.bind(this, "/signup")}>
          Finish Enrollment
        </li>}
        <li className="mobile-menu-button" onClick={this.handleLogout.bind(this)}>
          Log out
        </li>
      </ul>
    ) : (
      <ul className="navMenu">
        <li className={"mobile-menu-button" + (location.pathname == '/how-it-works' ? " -active" : "")} key='how-it-works' onClick={this.nextAction.bind(this, '/how-it-works')}>
          How it works
        </li>
        {/* <li className={"mobile-menu-button" + (location.pathname == '/all-meals' ? " -active" : "")} key='all-meals' onClick={this.nextAction.bind(this, '/all-meals')}>
          View meals
        </li> */}
        <li className={"mobile-menu-button" + (location.pathname == '/login' ? " -active" : "")} key='login' onClick={this.nextAction.bind(this, '/login')}>
          Log in
        </li>
        <li className="mobile-menu-button" key='signup' >
          <button className="secondary" onClick={this.nextAction.bind(this, '/signup')}>
            Get started
          </button>
        </li>
      </ul>
    )
    
    return (
      <div className={"mobileMenu" + (burgerOpen ? ' -open' : '')}>
        {navSelect}
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
    burgerOpen: state.ui.burger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    toggleBurger: () => dispatch(toggleBurger())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileMenuItems));
