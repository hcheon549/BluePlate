import React from "react";
import { Link, withRouter } from 'react-router-dom';

import HowItWorks from '../landing/LandingHIW';
import AuthForm from '../element/AuthForm';

const SignupForm = ({ setStep }) => {

  return (
    <div className="login-form-container">
      <div className="login-welcome">Your Mealplan now costs less than $6 per meal.</div>
      <div className="login-to-account">Create an account to get started</div>

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
        Already have a BluePlate account?
      </div>
      <Link to="/users/login" className="blueLink">Log In!</Link>
    </div>
  );
}


export default withRouter(SignupForm);