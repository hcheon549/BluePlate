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
    let { currentUser } = this.props
    let header = currentUser.policyType == 'Member' ? <h3>WELCOME BACK, {currentUser.fname.toUpperCase()}!</h3> : <h3>LUNCH AND DINNER<br/>FOR LESS THAN $6</h3>,
        subHeader = currentUser.policyType == 'Member' ? 'ORDER YOUR NEXT MEALS NOW.' : 'DISCOVER THE RESTAURANTS NEAR YOUR CAMPUS.',
        buttonText = currentUser.policyType == 'Member' ? 'View Meals' : 'Get Started',
        altButtonText = 'See Restaurants',
        browseLink = currentUser.policyType == 'Member' ? '/my-meals' : '/signup';
    console.log(currentUser)
    return (
      <section className="landingHeader">
        <div className="headerContent">
          <div className="mobileContent">
            {header}
            <p>{subHeader}</p>
            <div style={{display: "flex", justifyContent: 'center'}}>
              <button className='orange' type="submit" onClick={() => this.props.history.push(browseLink)}>{buttonText}</button>
              {currentUser.policyType != 'Member' && 
              <button
                className='orangeSecondary'
                type="submit"
                style={{marginLeft: '20px'}}
                onClick={this.scrollToMap}
              >
                {altButtonText}
              </button>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LandingHeader;
