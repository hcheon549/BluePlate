import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
    let header = 'MEALPLAN FOR LESS THAN $6 PER MEAL',
        subHeader = 'FIND OUT THE RESTAURANTS IN YOUR CAMPUS.',
        buttonText = 'Browse Meals';

    return (
      <section className="landingHeader">
        <div className="landingCapture">
          <h3>MEALPLAN FOR LESS THAN<br/> $6 PER MEAL</h3>
          <p>{subHeader}</p>
          <Link to="/users/signup">
            <button className='orange' type="submit">{buttonText}</button>
          </Link>
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
