import React from 'react'

const LandingHIW = () => {
  return (
    <section className="landingHIW">
      <h4>
        <span className="section-title">How BluePlate works:</span>
      </h4>
      <div className="main-info">
        <div className="column1">
          <img className="choose-icon icon" src={'https://static.bookofthemonth.com/landing/exp24/Icon_WellKnown.svg'} />
          <h4 className="column-text">Choose</h4>
          <p className="column-text">Whether it's your favorite, the closest, or the new place you've wanted to try.</p>
        </div>
        <br/>
        <div className="column2">
          <img className="showup-icon icon" src={'https://static.bookofthemonth.com/landing/exp24/Icons_Series.svg'}/>
          <h4 className="column-text">Pick up</h4>
          <p className="column-text">
            Skip the line, the wait, and the hassle. Just pick up and go on.
          </p>
        </div>
        <br/>
        <div className="column3">
          <img className="drink-icon icon" src={'https://static.bookofthemonth.com/landing/exp24/Icon_Happy.svg'}/>
          <h4 className="column-text">Eat Well, Save Money</h4>
          <p className="column-text">You can still eat well within your budget without cooking.</p>
        </div>
      </div>
    </section>
  )
}

export default LandingHIW