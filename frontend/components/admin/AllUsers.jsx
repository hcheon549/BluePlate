import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchAllUsers } from '../../actions/user_actions';

class AllUsers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      usersType: 'Members'
    }
    this.listUsers = this.listUsers.bind(this)
    this.toggleUserType = this.toggleUserType.bind(this)
  }

  async componentDidMount(){
    await this.props.fetchAllUsers();
    this.setState({
      loaded: true
    })
  }

  sortUsers(){
    let [leads, members, canceledUsers] = [[], [], []]
    Object.values(this.props.allUsers).forEach((user) => {
      switch(user.policyType){
        case 'Member':
          members.push(user);
        case 'Cancelled':
          canceledUsers.push(user);
        default:
          leads.push(user)
      }
    })

    return [leads, members, canceledUsers]
  }

  toggleUserType(e){
    this.setState({
      usersType: e.target.value
    })
  }

  listUsers(type){
    let [leads, members, canceledUsers] = [[], [], []]

    Object.values(this.props.allUsers).forEach((user) => {
      switch(user.policyType){
        case 'Member':
          return members.push(user);
        case 'Cancelled':
          return canceledUsers.push(user);
        default:
          return leads.push(user)
      }
    })

    switch(type){
      case 'Leads':
        return <UsersList type={'Leads'} users={leads} />;
      case 'Cancelled':
        return <UsersList type={'Cancelled'} users={canceledUsers} />;
      case 'Member':
      default:
        return <UsersList type={'Members'} users={members} />;
    }
  }

  render() {
    if (!this.state.loaded){
      return <div />
    }

    let { usersType } = this.state;

    let dropdownMenu = (
      <select
        className="schoolDropdown"
        id="dropdown-button"
        defaultValue={this.state.usersType}
        onChange={this.toggleUserType}
      >
        <option className="schoolList" value={'Members'} key={1}>
          Members
        </option>
        <option className="schoolList" value={'Leads'} key={2}>
          Leads
        </option>
        <option className="schoolList" value={'Cancelled'} key={3}>
          Cancelled
        </option>
      </select>
    )

    return (
      <div className="allUsers">
        {dropdownMenu}
        {this.listUsers(usersType)}
      </div>
    );
  }
}

const UsersList = ({type, users}) => {
  let thead = type == 'Members' ? (
    <tr className="vendorList">
      <th>No.</th>
      <th>Email</th>
      <th>First Name</th>
      <th>Last Name</th>
      {/* <th>Plan</th> */}
      <th>Meal Credits Left</th>
      <th>Renewal Date</th>
    </tr>
  ) : (
    <tr className="vendorList">
      <th>No.</th>
      <th>Email</th>
      <th>Date Captured</th>
    </tr>
  )

  let listUsers = (type) => {
    if (type == 'Members'){
      return users.map((user, idx) => {
        return (
          <tr className="vendorList" key={idx}>
            <td>{idx+1}</td>
            <td>{user.email}</td>
            <td>{user.fname}</td>
            <td>{user.lname}</td>
            <td>{user.summary.mealCreditsLeft}</td>
            <td>{user.subscription.subscriptionEnd}</td>
          </tr>
        )
      })
    } else {
      return users.map((user, idx) => {
        return (
          <tr className="vendorList" key={idx}>
            <td>{idx+1}</td>
            <td>{user.email}</td>
            <td>{user.createdAt}</td>
          </tr>
        )
      })
    }
  }

  return(
    <table>
      <thead>
        {thead}
      </thead>
      <tbody>
        {listUsers(type)}
      </tbody>
    </table>
  )
}

const msp = ({entities}) => {
  return {
    allUsers: entities.accounts
  };
};

const mdp = (dispatch) => {
 return {
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default withRouter(connect(msp, mdp)(AllUsers));