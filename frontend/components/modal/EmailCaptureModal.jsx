import React from "react";
import { withRouter } from 'react-router-dom';

import LeadCaptureForm from '../element/LeadCaptureForm';

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
          <img className="logo" src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <h4>See you in the Spring semester!</h4>
          <p><span className="miniText">
            BluePlattr is coming to Rutgers in this coming Spring Semester. Sign up for exclusive discount offers.
          </span></p>
          <LeadCaptureForm />
        </div>
      </div>
    );
  }
}

export default withRouter(EmailCaptureModal);