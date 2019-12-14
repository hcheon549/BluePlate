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
      this.props.setSignature();
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
            Any information and actions on this page including, but not limited to, name and location of restaurants, menu items and reservations are for demonstration purposes only. Neither BluePlattr nor restaurants will recognize or honor reservations made on this page.
          </span></p>
          <label style={{display: 'block'}}>
            <input type="checkbox"  name="signed" id="disclaimer-agree" checked={this.state.signed} value="" onChange={this.toggleAgreeButton} />
            <span className="miniText">I have read and agreed to this disclaimer.</span>
          </label>
          <button className={'orangeSecondary' + (this.state.signed ? '' : ' -disabled')} type="submit" onClick={this.proceed}>Check it out!</button>
        </div>
      </div>
    );
  }
}

export default withRouter(DisclaimerModal);