import React from 'react'

const LandingHIW = () => {
  return (
    <section className="landingHIW">
      <div className="content -siteWidth">
        <div className="sectionHeader">
          <h4>How BluePlate works:</h4>
        </div>
        <div className="main-info">
          <div className="column">
            <img className="choose-icon icon" src={"https://blueplate-development.s3.amazonaws.com/elements/choose.svg"} alt={"well-known"}/>
            <h4 className="column-text">Choose</h4>
            <p className="column-text">Whether it's your favorite, the closest, or the new place you've wanted to try.</p>
          </div>
          <br/>
          <div className="column">
            <img className="showup-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/pizza.svg'} alt={"well-known"}/>
            <h4 className="column-text">Pick up</h4>
            <p className="column-text">
              Skip the line, the wait, and the hassle. Just pick up and go on.
            </p>
          </div>
          <br/>
          <div className="column">
            <img className="drink-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/smile.svg'} alt={"well-known"}/>
            <h4 className="column-text">Eat Well, Save Money</h4>
            <p className="column-text">You can still eat well within your budget without a trip to a grocery store.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingHIW