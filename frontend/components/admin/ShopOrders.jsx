import React from 'react';

class ShopOrders extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    debugger
    return(
      <div>
        <li>{this.props.shop.name}</li>
        <label>Total Orders:</label>{this.props.reservations.length}
      </div>
);
  }
}

export default ShopOrders;
