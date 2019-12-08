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
    this.props.closeModal();
  }

  toggleAgreeButton(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
            Any information and actions in this page including name and location restaurants , menu items and reservations are for demonstration purposes. BluePlattr or restaurants do not recognize reservations made in this page, and will not honor for any claim made in this page.
          </span></p>
          <input type="checkbox"  name="signed" checked={this.state.signed} value="" onChange={this.toggleAgreeButton} />
            <label value="agreed">I have read and agree to the disclaimer.</label>
          <button className={'orangeSecondary' + (this.state.signed ? '' : ' disabled')} type="submit" onClick={this.proceed}>Check it out!</button>
        </div>
      </div>
    );
  }
}

export default withRouter(DisclaimerModal);