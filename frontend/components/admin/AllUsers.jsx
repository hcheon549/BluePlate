import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AllUsers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      users: null
    }
  }

  async componentDidMount(){
    await this.props.fetchAllUsers();
    this.setState({
      loaded: true
    })
  }

  render() {
    // if (!this.state.loaded){
    //   return <div />
    // }

    return (
      <div className="allUsers">
        <h1>All Users</h1>
      </div>
    );
  }
}

const msp = ({entities, ui}) => {
  return {
  };
};

const mdp = (dispatch) => {
 return {
    fetchAllMembers: () => dispatch(sendReservations()),
  };
};

export default withRouter(connect(msp, mdp)(AllUsers));