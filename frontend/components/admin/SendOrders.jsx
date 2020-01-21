import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from "axios";


import { sendReservations } from '../../actions/reservation_actions';
import { fetchSchools } from '../../actions/school_actions';
import { createMenu } from '../../actions/menu_actions';

class SendOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      shop: null
    }
    this.listShops = this.listShops.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllReservations();
  }

  listShops(){
    let shops = Object.values(this.props.shops)
    return shops.map((shop, idx) => <li key={idx}>{shop.name}</li>)
  }

  render() {
    return (
      <div className="send-orders">
        <ul>
          {this.listShops()}
        </ul>
      </div>
    );
  }
}

const msp = ({ui}) => {
  return {
    reservations: ui.sendReservations
  };
};

const mdp = (dispatch) => {
 return {
    fetchAllReservations: () => dispatch(sendReservations())
  };
};

export default withRouter(connect(msp, mdp)(SendOrders));