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
          <img className="logo" src="https://blueplate-development.s3.amazonaws.com/BluePlattr_logo.png" alt="logo" />
          <h4>See you in the Spring semester...</h4>
          <p><span className="miniText">
            Your plan sarts on the first day of spring 2020 semester. Preciesly speaking, that's January 21st, in which you can start selecting Lunch and Dinner for the 22nd. Until then, keep calm and stay hungry.
          </span></p>
          <button className='orange' type="submit" onClick={this.goBack}>Go to Home Page</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ClosedModal);