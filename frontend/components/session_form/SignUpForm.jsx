import React from "react";
import { Link, withRouter } from 'react-router-dom';

import HowItWorks from '../landing/LandingHIW';
import AuthForm from '../element/AuthForm';

const SignupForm = ({ setStep }) => {

  return (
    <React.Fragment>
      <div className="partitions">
        <div className="signupPartition">
          <HowItWorks authPage={true}/>
        </div>
        <div className="signupPartition">
          <AuthForm 
            formType={'Sign-Up'}
            buttonText={'Continue'}
            setStep={setStep}
          />
        </div>
      </div>
      <div className="login-donthave">
        Already have a BluePlattr account?
      </div>
      <Link to="/users/login" className="blueLink">Log In!</Link>
    </React.Fragment>
  );
}


export default withRouter(SignupForm);