import React from 'react'

const LandingHIW = (props) => {
  let header,
      subHead1, content1,
      subHead2, content2,
      subHead3, content3;

    header = 'How BluePlate works:',
    subHead1 = 'Choose',
    content1 = 'Whether it\'s your favorite, the closest, or the new place you\'ve wanted to try.',
    subHead2 = 'Pick up',
    content2 = 'Skip the line, the wait, and the hassle. Just pick up and go on.',
    subHead3 = 'Eat Well, Save Money',
    content3 = 'You can still eat well within your budget without a trip to a grocery store.'


  if (props.authPage){
    content1 = 'Choose a meal from 5pm the day before until 1 hour prior to your desired pick up time.',
    content2 = 'Show up, show the cashier your order summary, pick up and go on.',
    content3 = 'Eat well and save money without a trip to the grocery. You already have a lot of things to do.'
  }

  return (
    <section className="landingHIW">
      <div className="content -siteWidth">
        <div className="sectionHeader">
          <h4>{header}</h4>
        </div>
        <div className="main-info">
          <div className="column">
            <img className="choose-icon icon" src={"https://blueplate-development.s3.amazonaws.com/elements/choose.svg"} alt={"well-known"}/>
            <div className="hiwContent">
              <h4 className="column-text">{subHead1}</h4>
              <p className={"column-text " + props.authPage ? ' miniText' : ''}>{content1}</p>
            </div>
          </div>
          <br/>
          <div className="column">
            <img className="showup-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/pizza.svg'} alt={"well-known"}/>
            <div className="hiwContent">
              <h4 className="column-text">{subHead2}</h4>
              <p className={"column-text " + props.authPage ? ' miniText' : ''}>{content2}</p>
            </div>
          </div>
          <br/>
          <div className="column">
            <img className="drink-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/smile.svg'} alt={"well-known"}/>
            <div className="hiwContent">
              <h4 className="column-text">{subHead3}</h4>
              <p className={"column-text " + props.authPage ? ' miniText' : ''}>{content3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingHIW