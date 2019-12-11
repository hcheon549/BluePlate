import React from "react";
import { withRouter } from 'react-router-dom';

class ClosedModal extends React.Component {
  constructor(props){
    super(props)
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.push('/');
    this.props.closeModal();
  }

  render() {
    return (
      <div
        className="closed-modal animated fadeInDown"
        onClick={e => e.stopPropagation()}
      >
        <div className="innerContent">
          <img className="logo" src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <h4>See you in the Spring semester...</h4>
          <p><span className="miniText">
            Your plan starts on the first day of Spring 2020 semester. Preciesly speaking, that's January 21, 2020. Until then, keep calm and stay hungry.
          </span></p>
          <button className='orange' type="submit" onClick={this.goBack}>Go to Home Page</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ClosedModal);