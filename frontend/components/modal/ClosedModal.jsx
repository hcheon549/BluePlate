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
          <h4>See You Next Semester on Campus!</h4>
          <p><span className="miniText">
            We are not offering our meal plan for the Summer sessions due to the COVID-19 pandemic. However, we will be back next semester when you all come back to the campus. Stay safe and hope to see you soon!
          </span></p>
          <button className='orange' type="submit" onClick={this.goBack}>Go to Home Page</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ClosedModal);