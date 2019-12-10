import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import NavLogin from "./NavLogin";
import MenuItem from "./MenuItem";
import StepIndicator from './StepIndicator'

const Nav = (props) => {
  let navSelect = props.location.pathname === "/users/signup" ? (
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
  <div className="shadow">
    <div className="nav-main content -siteWidth">
      <div className="navLogo">
        <Link to="/">
          <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span className="theLogo">BluePlattr</span>
        </Link>
      </div>
      {navSelect}
      </div>
    </div>
    )
};

const Burger = (props) => {
  return (
    <div className="navLogo">
      <Link to="/">
        <img src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
        <span className="theLogo">BluePlattr</span>
      </Link>
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
    let navigation = this.state.isMobile ? <Burger {...this.props} /> : <Nav {...this.props} />
    return navigation
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
  };
};

export default withRouter(connect(mapStateToProps)(Navigation));
