import React from "react";
import { withRouter } from 'react-router-dom';

class EmailCaptureModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      wishlist: ''
    }

    this.proceed = this.proceed.bind(this);
    this.toggleAgreeButton = this.toggleAgreeButton.bind(this);
  }

  proceed(){
    console.log(this.state)
  }

  toggleAgreeButton(){
    this.setState({
      signed: !this.state.signed
    });
  }

  render() {
    return (
      <div
        className="closed-modal animated fadeInDown"
        onClick={e => e.stopPropagation()}
      >
        <div className="innerContent">
          <h4>Disclaimer</h4>
          <button className={'orangeSecondary -disabled'} type="submit" onClick={this.proceed}>Check it out!</button>
        </div>
      </div>
    );
  }
}

export default withRouter(EmailCaptureModal);