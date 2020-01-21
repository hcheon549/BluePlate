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
          <h4>Welcome!</h4>
          <p><span className="miniText">
            Every day, we open our kitchen at 9PM. That means you will be able to select your lunch and dinner for tomorrow starting at 9 PM tonight. Until then, keep calm and stay hungry.
          </span></p>
          <button className='orange' type="submit" onClick={this.goBack}>Go to Home Page</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ClosedModal);