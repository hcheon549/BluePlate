import React from "react";
import { withRouter } from 'react-router-dom';

class DisclaimerModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      signed: false
    }

    this.proceed = this.proceed.bind(this);
    this.toggleAgreeButton = this.toggleAgreeButton.bind(this);
  }

  proceed(){
    if (this.state.signed){
      this.props.closeModal();
    }
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
          <p><span className="miniText">
            Any information and actions in this page including, but not limited to, name and location of restaurants, menu items and reservations are for demonstration purposes. BluePlattr or restaurants will not recognize or honor reservations or any claims made in this page.
          </span></p>
          <label>
            <input type="checkbox"  name="signed" id="disclaimer-agree" checked={this.state.signed} value="" onChange={this.toggleAgreeButton} />
            I have read and agree to the disclaimer.
          </label>
          <button className={'orangeSecondary' + (this.state.signed ? '' : ' -disabled')} type="submit" onClick={this.proceed}>Check it out!</button>
        </div>
      </div>
    );
  }
}

export default withRouter(DisclaimerModal);