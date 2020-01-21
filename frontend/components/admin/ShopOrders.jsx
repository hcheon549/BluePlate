import React from 'react';

class ShopOrders extends React.Component{
  constructor(props) {
    super(props);
    this.sendOrder = this.sendOrder.bind(this);
  }

  sendOrder(e){
    e.preventDefault();
    
    this.props.sendOrder({
      shop_id: this.props.shop.id,
      reservations: this.props.reservations,
      meal: this.props.meal
    })
  }

  render() {
    let { shop, reservations, meal } = this.props
    return(
      <div className="vendorList">
        <li>{shop.name} - {meal ? meal.name : ""} <span>({reservations.length})</span></li>
        <button className="secondary" onClick={this.sendOrder}>Send Order</button>
      </div>
    );
  }
}

export default ShopOrders;
