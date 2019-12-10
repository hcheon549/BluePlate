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
      email: 'demo@gmail.com',
      password: 'ececec'
    }
    await this.props.processLogIn(user);
    this.props.history.push('/demo')
  }

  render() {
    let header = 'MEALPLAN FOR LESS THAN $5 PER MEAL',
        subHeader = 'FIND OUT THE RESTAURANTS IN YOUR CAMPUS.',
        buttonText = 'Browse Meals',
        altButtonText = 'Try DEMO',
        browseLink = this.props.currentUser.policyType == 'Member' ? '/my-meals' : '/users/signup';

    return (
      <section className="landingHeader">
        <div className="landingCapture">
          <h3>MEALPLAN FOR LESS THAN<br/> $5 PER MEAL</h3>
          <p>{subHeader}</p>
          <div style={{display: "flex", justifyContent: 'center'}}>
            <Link to={browseLink}>
              <button className='orange' type="submit">{buttonText}</button>
            </Link>
            <button
              className='orangeSecondary'
              type="submit"
              style={{marginLeft: '20px'}}
              onClick={this.tryDemo}
            >{altButtonText}</button>
          </div>
        </div>
      </section>
    )
  }
}

export default LandingHeader;
