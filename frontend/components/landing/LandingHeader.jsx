import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EmailCaptureForm from '../element/EmailCaptureForm'

class LandingHeader extends React.Component {
  constructor(props){
    super(props);
    this.nextAction = this.nextAction.bind(this);
  }

  nextAction() {
    this.props.history.push("/my-meals");
  }

  render() {
    let header = 'MEAL FOR LESS THAN $6',
        subHeader = 'FIND OUT THE RESTAURANTS IN YOUR CAMPUS.',
        buttonText = 'Browse Meal';

    return (
      <section className="landingHeader">
        <div className="landingCapture">
          <h2>{header}</h2>
          <h3>{subHeader}</h3>
          <EmailCaptureForm
            buttonType={'primary'}
            buttonText={buttonText}
            nextAction={this.nextAction}
          />
          </div>
      </section>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

export default withRouter(LandingHeader);
