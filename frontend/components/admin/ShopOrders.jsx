import React from 'react';

class ShopOrders extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pending: false
    }
    this.sendOrder = this.sendOrder.bind(this);
  }

  async sendOrder(e){
    e.preventDefault();

    this.setState({
      pending: true
    })
    
    let sendEmail = await this.props.sendOrder({
      shop_id: this.props.shop.id,
      reservations: this.props.reservations,
      meal: this.props.menu.meal
    })

    console.log(sendEmail)

    if(sendEmail){
      this.setState({
        pending: false
      })
    }
  }

  render() {
    let { shop, reservations, menu } = this.props
    let { pending } = this.state

    return(
      <div className="vendorList">
        <li>{shop.name} - {menu ? menu.meal.name : ""} <span>({reservations.length})</span></li>
        <button className={("secondary") +  (pending ? " -pending" : "")} disabled={pending} onClick={this.sendOrder} >
            {!pending && "Send Order"}
          </button>
      </div>
    );
  }
}

export default ShopOrders;
