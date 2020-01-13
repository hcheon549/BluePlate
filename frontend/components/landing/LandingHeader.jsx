import React from 'react'
import { Link } from 'react-router-dom';

class LandingHeader extends React.Component {
  constructor(props){
    super(props);
    this.nextAction = this.nextAction.bind(this);
    this.tryDemo = this.tryDemo.bind(this);
  }

  nextAction() {
    this.props.history.push("/my-meals");
  }

  async tryDemo(){
    let user = {
      email: 'eric@blueplattr.com',
      password: 'ececec'
    }
    await this.props.processLogIn(user);
    this.props.history.push('/demo')
  }

  render() {
    let header = 'MEALPLAN FOR LESS THAN $6 PER MEAL',
        subHeader = 'FIND OUT THE RESTAURANTS NEAR YOUR CAMPUS.',
        buttonText = 'Get Started',
        altButtonText = 'Try DEMO',
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
                onClick={this.tryDemo}
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
