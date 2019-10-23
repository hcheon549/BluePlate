import React from "react";
import { Link, withRouter } from 'react-router-dom';

import HowItWorks from '../landing/LandingHIW';
import AuthForm from '../element/AuthForm';

const SignupPage = () => {

  return (
    <div className="login-page">
      <div className="login-form-main">
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
              />
            </div>
          </div>
          <div className="login-donthave">
            Already have a BluePlate account?
          </div>
          <Link to="/login" className="blueLink">Log In!</Link>
        </div>
      </div>
    </div>
  );
}


export default withRouter(SignupPage);