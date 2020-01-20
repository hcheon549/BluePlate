import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import DropdownMenu from "./DropdownMenu";

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      disabled: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
 
  componentDidMount() {
    this.setState({ disabled: false });
  }

  handleLogout() {
    this.setState({ disabled: true }, () => this.props.logout());
    window.location.replace('/')
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    let { history: {location} } = this.props
    let accountPath = ['/account', '/history']
    
    let dropdownMenu = (
      <DropdownMenu
        isMember={this.props.isMember}
        active={this.state.active}
        history={this.props.history}
        handleLogout={this.handleLogout.bind(this)}
      />
    )

    let optionMenu = this.props.isMember ? (
      <li className={"nav-menu-button miniText" + (location.pathname == '/account' ? " -active" : "")} onClick={() => this.props.history.push('/account')}>
        My Account
      </li>
    ) : (
      <li className={"nav-menu-button miniText"} onClick={() => this.props.history.push("/signup")}>
        Finish Enrollment
      </li>
    )

    return (
      <ul className="navLogin">
        {this.props.isMember && <li className={"nav-menu-button miniText" + (location.pathname == '/my-meals' ? " -active" : "")} onClick={() => this.props.history.push('/my-meals')}>
          View meals
        </li>}
        {/* <li className={"nav-menu-button miniText" + (accountPath.includes(location.pathname) ? " -active" : "")} onClick={() => this.toggleClass()}>
          My account
          {dropdownMenu}
        </li> */}
        {optionMenu}
        <li className="login-link miniText" onClick={this.handleLogout}>
          Log out
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  let { currentUser } = state.entities
  return { 
    isVisitor: currentUser && currentUser.policyType == "Visitor",
    isLead: currentUser && currentUser.policyType == "Lead",
    isMember: currentUser && currentUser.policyType == "Member",
    loggedIn: Boolean(state.session.id),
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItem));
