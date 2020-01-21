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
      </div>
);
  }
}

export default ShopOrders;
