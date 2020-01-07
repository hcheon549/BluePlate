import React from 'react'

const LandingHIW = (props) => {
  let header,
      subHead1, content1,
      subHead2, content2,
      subHead3, content3;

    header = 'How BluePlattr works',
    subHead1 = 'Browse',
    content1 = 'Local restaurants offer one special meal per day. We call that the BluePlattr.',
    subHead2 = 'Choose',
    content2 = 'Select your meals and pick-up time in advance, as early as the night before.',
    subHead3 = 'Pick up',
    content3 = 'Skip the line, the wait, and the hassle. Just pick up and go.'


  // if (props.authPage){
  //   content1 = 'Choose a meal from 9PM the night before. Select your lunch by 10 AM and your dinner by 4 PM.',
  //   content2 = 'Show up, show the cashier your order summary, pick up and go.',
  //   content3 = 'Eat well and save money without a trip to the grocery. You already have a lot of things to do.'
  // }

  return (
    <section className="landingHIW">
      <div className="content -siteWidth">
        <div className="sectionHeader">
          <h4>{header}</h4>
        </div>
        <div className="main-info">
          <div className="column">
            <img className="choose-icon icon" src={"https://blueplate-development.s3.amazonaws.com/elements/choose.png"} alt={"well-known"}/>
            <div className="hiwContent">
              <h4 className="column-text">{subHead1}</h4>
              <p className={"column-text " + ( props.authPage ? ' miniText' : '' )}>{content1}</p>
            </div>
          </div>
          <br/>
          <div className="column">
            <img className="showup-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/pickup.png'} alt={"well-known"}/>
            <div className="hiwContent">
              <h4 className="column-text">{subHead2}</h4>
              <p className={"column-text " + ( props.authPage ? ' miniText' : '' )}>{content2}</p>
            </div>
          </div>
          <br/>
          <div className="column">
            <img className="drink-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/eatwell.png'} alt={"well-known"}/>
            <div className="hiwContent">
              <h4 className="column-text">{subHead3}</h4>
              <p className={"column-text " + ( props.authPage ? ' miniText' : '' )}>{content3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingHIW