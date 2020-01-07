import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../actions/session_actions';

import LandingCapture from './../landing/LandingCapture';

const HowItWorks = (props) => {
  let header,
      subHead1, content1,
      subHead2, content2,
      subHead3, content3;

    header = 'How BluePlattr works',
    subHead1 = 'Browse',
    content1 = 'Your local restaurants offer one daily special everyday for lunch and dinner. We call that the BluePlattr. You can select any of the BluePlattr specials for your lunch and dinner. Be excited about new BluePlattr special you\'ll see everyday!',
    subHead2 = 'Choose',
    content2 = 'Select the BluePlattr special for your lunch and dinner. You can select your meals in advance starting at 9 PM the night before, up until 10 AM for lunch, and 4 PM for dinner. Hurry, because your favorite BluePlattr may be sold out!',
    subHead3 = 'Pick up',
    content3 = 'You will receive a 4-digit pick-up code when you reserve your meals through an email. Show it to the cashier, get your food. No lines, no hassles, and no more trip to a grocery. It\'s the most affordable meal plan you\'ll ever get.'

  let tryDemo = async () => {
    let user = {
      email: 'demo@gmail.com',
      password: 'ececec'
    }
    await props.processLogIn(user);
    props.history.push('/demo')
  }


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
          <button
            className='orangeSecondary'
            type="submit"
            onClick={tryDemo}
          >
            Try DEMO
          </button>
          <div className="main-info">
            <div className="column">
              <img className="icon" src={"https://blueplate-development.s3.amazonaws.com/elements/choose.png"} alt={"Browse"}/>
              <img className="number" src={"https://blueplate-development.s3.amazonaws.com/elements/one.png"} alt={"One"}/>
              <div className="hiwContent">
                <h4 className="column-text">Browse</h4>
                <p className="column-text">Your local restaurants offer one daily special every day for lunch and dinner. We call that the BluePlattr. You can select any of the BluePlattr specials for your lunch and dinner. Be excited about the new BluePlattr special you'll see every day!</p>
              </div>
            </div>
            <br/>
            <div className="column">
              <img className="number" src={"https://blueplate-development.s3.amazonaws.com/elements/two.png"} alt={"two"}/>
              <div className="hiwContent">
                <h4 className="column-text">Choose</h4>
                <p className="column-text">Select the BluePlattr special you love for your lunch and dinner. You can reserve your meals in advance starting at 9 PM the night before up until 10 AM for lunch and 4 PM for dinner. Hurry! Because your favorite BluePlattr may be sold out!</p>
              </div>
              <img className="icon -left" src={'https://blueplate-development.s3.amazonaws.com/elements/pickup.png'} alt={"Order"}/>
            </div>
            <br/>
            <div className="column">
              <img className="icon" src={'https://blueplate-development.s3.amazonaws.com/elements/eatwell.png'} alt={"Pick-up"}/>
              <img className="number" src={"https://blueplate-development.s3.amazonaws.com/elements/three.png"} alt={"Three"}/>
              <div className="hiwContent">
                <h4 className="column-text">Pick Up</h4>
                <p className="column-text">You will receive a 4-digit pick-up code when you reserve your meals. Show it to the cashier and receive your meal. No lines, no hassles, and better yet, no more trip to a grocery store! It's the most affordable and convenient meal plan you'll ever need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LandingCapture />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processLogIn: (user) => dispatch(login(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HowItWorks));
