import React from "react";

const SectionHeader = ({form}) => {
  let header, subHead;

  switch(form){
    case 'account':
      header = 'Your Mealplan now costs less than $6 per meal.',
      subHead = 'Create an account to get started.';
      break;
    case 'plan':
      header = 'Select your plan.',
      subHead = 'Select this semester\'s BluePlate Plan.';
      break;
    case 'billing':
      header = 'One more step!',
      subHead = 'Review your subscription summary, and enter billing information.';
      break;
    default:
      [ header, subHead ] = ['', ''];
  }

  return (
    <>
      <div className="login-welcome">{header}</div>
      <div className="login-to-account">{subHead}</div>
    </>
  );
}

export default SectionHeader;