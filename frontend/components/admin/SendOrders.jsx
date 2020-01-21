import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendReservations, sendOrder } from '../../actions/reservation_actions';

import ShopOrders from './ShopOrders'

const DAY = [
  'Sunday', 
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday'
]

const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class SendOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      shop: null
    }
    this.listShops = this.listShops.bind(this);
    this.getMenuDate = this.getMenuDate.bind(this);
  }

  async componentDidMount(){
    await this.props.fetchAllReservations();
    this.setState({
      loaded: true
    })
  }

  getMenuDate() {
    const today = new Date()
    const tomorrow = new Date(today)
    const thisHour = today.getHours();

    tomorrow.setDate(tomorrow.getDate() + 1);

    let day, month, date, year, menuDate

    if (thisHour < 21){
      day = DAY[today.getDay()],
      month = MONTH[today.getMonth()],
      date = today.getDate(),
      year = today.getFullYear()
    } else {
      day = DAY[tomorrow.getDay()],
      month = MONTH[tomorrow.getMonth()],
      date = tomorrow.getDate(),
      year = tomorrow.getFullYear()
    }

    menuDate = `${day}, ${month} ${date}, ${year}`

    return menuDate
  }


  listShops(){
    let shops = Object.values(this.props.shops)
    let reservations = Object.values(this.props.reservations)

    return shops.map((shop, idx) => {
      let reservationsShop = reservations.filter((res) => {
        return res.shop.id == shop.id
      })
      let meal = reservationsShop.length > 0 ? reservationsShop[0].meal : null
      return <ShopOrders 
              key={idx}
              shop={shop}
              reservations={reservationsShop}
              meal={meal}
              sendOrder={this.props.sendOrder}
            />
    })
  }

  render() {
    if (!this.state.loaded){
      return <div />
    }

    return (
      <div className="send-orders">
        <div className="orderStatus">
          <h5>Order Status for {this.getMenuDate()}</h5>
        </div>
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
    fetchAllReservations: () => dispatch(sendReservations()),
    sendOrder: (data) => dispatch(sendOrder(data))
  };
};

export default withRouter(connect(msp, mdp)(SendOrders));