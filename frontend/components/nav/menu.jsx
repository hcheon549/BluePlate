import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import DropdownMenu from "../element/DropdownMenu";

class Menu extends React.Component {
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
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    let dropdownMenu = (
      <DropdownMenu
        isMember={this.props.isMember}
        active={this.state.active}
        history={this.props.history}
        handleLogout={this.handleLogout.bind(this)}
      />
    )
    return (
      <ul className="navLogin">
        <li className="nav-menu-button" onClick={() => this.toggleClass()}>
          <img className="hamburger" src="https://blueplate-development.s3.amazonaws.com/elements/hamburger.svg" alt="" />
          MENU
          {dropdownMenu}
        </li>
        <li className="login-link">
          <div onClick={this.handleLogout}>LOGOUT</div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
