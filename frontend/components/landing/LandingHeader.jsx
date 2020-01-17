import React from 'react'
import { Link } from 'react-router-dom';

class LandingHeader extends React.Component {
  constructor(props){
    super(props);
    this.nextAction = this.nextAction.bind(this);
  }

  nextAction() {
    this.props.history.push("/my-meals");
  }

  scrollToMap(){
    let destination = document.getElementById('landingMap').offsetTop
    window.scrollTo({
      top: destination,
      behavior: 'smooth'
    })
  }

  render() {
    let header = 'MEALPLAN FOR LESS THAN $6 PER MEAL',
        subHeader = 'FIND OUT THE RESTAURANTS NEAR YOUR CAMPUS.',
        buttonText = 'Get Started',
        altButtonText = 'See Restaurants',
        browseLink = this.props.currentUser.policyType == 'Member' ? '/my-meals' : '/signup';

    return (
      <section className="landingHeader">
        <div className="headerContent">
          <div className="mobileContent">
            <h3>LUNCH AND DINNER<br/>FOR LESS THAN $6</h3>
            <p>{subHeader}</p>
            <div style={{display: "flex", justifyContent: 'center'}}>
              <button className='orange' type="submit" onClick={() => this.props.history.push(browseLink)}>{buttonText}</button>
              <button
                className='orangeSecondary'
                type="submit"
                style={{marginLeft: '20px'}}
                onClick={this.scrollToMap}
              >
                {altButtonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LandingHeader;
