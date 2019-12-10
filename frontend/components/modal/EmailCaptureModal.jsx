import React from "react";
import LeadCaptureForm from '../element/LeadCaptureForm';

const EmailCaptureModal = (props) => {
  let header, subHead, action;
  
  if (props.landing){
    header = "Living Off-campus just got better!"
    subHead = 'BluePlattr is coming to Rutgers University next semester! It\'s the easiest, most affordable and convinient way to do lunches and dinners, and we are sure that you will love it. Sign up and get an exclusive offer for next semester\'s plan!'
  } else {
    header = 'See you in the Spring semester!'
    subHead = 'Living off-campus? You can now have an affordable meal plan for yourself for as low as $5 per meal! Sign up and get a exclusive discount offer.'
  }

  action = () => {
    props.markAsSeen();
    props.closeModal();
  }

  return (
    <div
      className="leadCapture-modal animated fadeInDown"
      onClick={e => e.stopPropagation()}
    >
      <div className="innerContent">
        <div className="captureLogo">
          <img className="logo" src="https://blueplate-development.s3.amazonaws.com/logo.png" alt="logo" />
          <span className="theLogo">BluePlattr</span>
        </div>
        <h4>{header}</h4>
        <p><span className="miniText">
          {subHead}
        </span></p>
        <LeadCaptureForm />
        {props.landing && <div className="reject tinyText" onClick={action}>No Thanks</div>}
      </div>
    </div>
  );
}


export default EmailCaptureModal;