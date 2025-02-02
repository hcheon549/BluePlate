import React from "react";
import ReactGA from 'react-ga';
import LeadCaptureForm from '../element/LeadCaptureForm';

const EmailCaptureModal = (props) => {
  ReactGA.event({
    category: 'Lead',
    action: 'Show the lead capture modal.',
    nonInteraction: true
  })

  let header, subHead, action;
  
  if (props.landing){
    header = "Living Off-campus just got better!"
    subHead = 'BluePlattr is coming to Rutgers University next semester! It\'s the easiest, most affordable and convenient way to do meals, and we are sure that you will love it. Sign up and get an exclusive offer for next semester\'s plan!'
  } else {
    header = 'See you in the Spring semester!'
    subHead = 'Living off-campus? You can now have an affordable meal plan for yourself for as low as $6 per meal! Sign up and get exclusive offers.'
  }

  action = () => {
    props.markAsSeen();
    props.closeModal();
  }

  return (
    <div
      className="leadCapture-modal animated fadeInDown fadeInUp"
      onClick={e => e.stopPropagation()}
    >
      <div className="innerContent">
        <div className="captureLogo">
          <img className="logo" src="https://blueplate-development.s3.amazonaws.com/BluePlattr_logo.png" alt="logo" />
          <span className="theLogo">BluePlattr</span>
        </div>
        <h4>{header}</h4>
        <p><span className="miniText">
          {subHead}
        </span></p>
        <LeadCaptureForm landing={false} style={"secondary"}/>
        {props.landing && <div className="reject tinyText" onClick={action}>No Thanks</div>}
      </div>
    </div>
  );
}


export default EmailCaptureModal;