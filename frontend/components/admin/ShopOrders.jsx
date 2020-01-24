import React from 'react';

class ShopOrders extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      statusMessage: ''
    }
    
    this.sendOrder = this.sendOrder.bind(this);
    this.defineOrderType = this.defineOrderType.bind(this);
    this.lunchReservations = []
    this.dinnerReservations = []
    this.props.reservations.forEach((reservation) => {
      reservation.pickupTime.pickupType == 0
      ? this.lunchReservations.push(reservation)
      : this.dinnerReservations.push(reservation)
    })
  }

  defineOrderType() {
    let now = new Date()
    let hour = now.getHours()

    if (hour > 0 && hour < 15) {
      return 0
    } else {
      return 1
    }
  }

  async sendOrder(e){
    e.preventDefault();

    this.setState({ pending: true })
    let orderType = this.defineOrderType();
    let reservations = orderType == 0 ? this.lunchReservations : this.dinnerReservations;
    let pickupTime = orderType == 0 ? this.props.pickupTime.lunch : this.props.pickupTime.dinner;

    let sendEmail = await this.props.sendOrder({
      shop_id: this.props.shop.id,
      meal: this.props.menu.meal,
      orderType,
      reservations,
      pickupTime
    })

    console.log(sendEmail)

    if(sendEmail){
      this.setState({
        pending: false,
        statusMessage: `Sent`
      }) 
    } else {
      this.setState({
        pending: false,
        statusMessage: 'Error'
      })
    }
  }

  render() {
    let { shop, menu } = this.props
    let { pending } = this.state
    let buttonText = this.defineOrderType() == 0 ? 'Send Lunch Orders' : 'Send Dinner Orders'

    return(
      <tr className="vendorList">
        <td>{shop.name}</td>
        <td>{menu ? menu.meal.name : ""}</td>
        <td>{this.lunchReservations.length}</td>
        <td>{this.dinnerReservations.length}</td>
        <td>
          {menu && <button className={("secondary") +  (pending ? " -pending" : "")} disabled={pending} onClick={this.sendOrder} >
            {!pending && buttonText}
          </button>}
        </td>
        <td>
          {this.state.statusMessage}
        </td>
      </tr>
    );
  }
}

export default ShopOrders;
