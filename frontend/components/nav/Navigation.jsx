import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleBurger } from '../../actions/burger_actions'
import { logout } from '../../actions/session_actions';

import NavLogin from "./NavLogin";
import MenuItem from "./MenuItem";
import StepIndicator from './StepIndicator'

const Nav = (props) => {
  let navSelect = props.location.pathname === "/signup" ? (
    <StepIndicator activeStep={props.stepJoin}/>
  ) : (props.loggedIn && props.location.pathname !== '/demo') ? (
    <div className="nav-route">
      <MenuItem {...props} />
    </div>
  ) : (
    <div className="nav-route">
      <NavLogin {...props} />
    </div>
  )

  return (
      <div className="desktopNav content -siteWidth">
        <div className="navLogo">
          <Link to="/">
            <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
            <span className="theLogo">BluePlattr</span>
          </Link>
        </div>
        {navSelect}
      </div>
    )
};

const MobileNav = (props) => {
  const closeMenuItem = () => {
    if (props.location.pathname === "/demo"){
      props.logout()
    }
    if (props.burger){
      props.toggleBurger();
    }
  }

  return (
    <div className="mobileNav">
      <Burger {...props} />
      <div className="navLogo" onClick={closeMenuItem}>
        <Link to="/">
          <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span className="theLogo">BluePlattr</span>
        </Link>
      </div>
    </div>
  )
}

const Burger = (props) => {
  const toggleBurgerMenu = () => {
    props.toggleBurger();
  }

  return(
    <div
      className={"burger"
      + (props.burger ? ' open' : '')}
      onClick={toggleBurgerMenu}
      id="burger"
    ><span className="burgerLines"></span>
    </div>
  )
}

class Navigation extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isMobile: window.innerWidth <= 800
    }

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize() {
		if (window.innerWidth <= 800 && this.state.isMobile === false) {
			this.setState({ isMobile: true });
		} else if (window.innerWidth > 800 && this.state.isMobile === true) {
			this.setState({ isMobile: false });
		}
	}

  render(){
    let navigation = this.state.isMobile ? <MobileNav {...this.props} /> : <Nav {...this.props} />
    return (
      <div className="shadow">
        {navigation}
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
    toggleBurger: () => dispatch(toggleBurger()),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
