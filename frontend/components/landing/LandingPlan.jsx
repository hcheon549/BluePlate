import React from 'react'
import { Link } from 'react-router-dom';

const LandingPlan = (props) => {
  let planPath = props.currentUser.policyType == 'Member' ? '/my-meals' : '/signup';

  return (
    <section className="landingPlan">
      <div className="content -siteWidth">
        <img className="choose-icon icon" src={"https://blueplate-development.s3.amazonaws.com/elements/plate.png"} alt={"meal"}/>
        <h4>Starting at $5.99 per meal</h4>
        <p>Eating well and saving money now go <span className="nowrap">hand in hand.</span></p>
        <Link to={planPath}>
          <button className='secondary' type="submit">Choose your plan</button>
        </Link>
      </div>
    </section>
  )
}

export default LandingPlan