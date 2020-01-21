import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendReservations } from '../../actions/reservation_actions';

import ShopOrders from './ShopOrders'

class SendOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      shop: null
    }
    this.listShops = this.listShops.bind(this);
  }

  async componentDidMount(){
    await this.props.fetchAllReservations();
    this.setState({
      loaded: true
    })
  }

  listShops(){
    let shops = Object.values(this.props.shops)
    let reservations = Object.values(this.props.reservations)

    return shops.map((shop, idx) => {
      let reservationsShop = reservations.filter((res) => {
        res.shop.id = shop.id
      })
      return <ShopOrders key={idx} shop={shop} reseravtions={reservationsShop}/>
    })
  }

  render() {
    if (!this.state.loaded){
      return <div />
    }

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