import React from 'react';
import LandingCapture from './../landing/LandingCapture';

const HowItWorks = (props) => {
  let header,
      subHead1, content1,
      subHead2, content2,
      subHead3, content3;

    header = 'How BluePlattr works',
    subHead1 = 'Browse',
    content1 = 'Your local favorite restaurants offer daily specials everyday. Be excited about new menus you\'ll see!',
    subHead2 = 'Order',
    content2 = 'Kitchen opens at 9 PM the day before. You can order your a lunch by 10 AM, and a dinner by 4 PM with pick-up time.',
    subHead3 = 'Pick up',
    content3 = 'You\'ve already received the 4-digit pick-up code when you ordered. Show it to at the cashier, get your food, and enjoy!'


  return (
    <div className="howItWorks">
      <section className="landingHIW">
        <div className="content -siteWidth">
          <div className="sectionHeader">
            <h4>{header}</h4>
          </div>
          <div className="slogan">
            <li>AFFORDABLE</li>
            <li>CONVENIENT</li>
            <li>FLEXIBLE</li>
          </div>
          <div className="main-info">
            <div className="column">
              <img className="choose-icon icon" src={"https://blueplate-development.s3.amazonaws.com/elements/choose.svg"} alt={"well-known"}/>
              <div className="hiwContent">
                <h4 className="column-text">{subHead1}</h4>
                <p className={"column-text " + ( props.authPage ? ' miniText' : '' )}>{content1}</p>
              </div>
            </div>
            <br/>
            <div className="column">
              <img className="showup-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/pizza.svg'} alt={"well-known"}/>
              <div className="hiwContent">
                <h4 className="column-text">{subHead2}</h4>
                <p className={"column-text " + ( props.authPage ? ' miniText' : '' )}>{content2}</p>
              </div>
            </div>
            <br/>
            <div className="column">
              <img className="drink-icon icon" src={'https://blueplate-development.s3.amazonaws.com/elements/smile.svg'} alt={"well-known"}/>
              <div className="hiwContent">
                <h4 className="column-text">{subHead3}</h4>
                <p className={"column-text " + ( props.authPage ? ' miniText' : '' )}>{content3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LandingCapture />
    </div>
  )
}

export default HowItWorks