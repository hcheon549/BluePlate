import React from 'react';
import Checkmark from '../element/Check';


const StepIndicator = ({activeStep}) => {
  return (
    <div className="stepWrapper">
      <ul className='stepIndicator'>
        <li className={'miniText stepLink ' + (activeStep=='account' && ' -active')}>
          <span>{activeStep !== 'account' ? <Checkmark color={'#11afe2'} /> : "1. " }</span>
          <span>&nbsp;{"WELCOME"}</span>
        </li>

        <li style={{ flexGrow: 2 }}><div className='line'/></li>

        <li className={'miniText stepLink ' + (activeStep == 'plan' && ' -active')}>
          <span>{(activeStep == 'billing' || activeStep == 'orderReview')? <Checkmark color={'#11afe2'} /> : "2."}</span>
          <span>&nbsp;{"PLAN & PRICING"}</span>
        </li>

        <li style={{flexGrow: 2}}><div className='line' /></li>

        <li className={'miniText stepLink ' + (activeStep == 'billing' && ' -active')}>
          <span>{"3."}</span>
          <span>&nbsp;{"CHECKOUT"}</span>
        </li>
      </ul>
    </div > 
  );
}

export default StepIndicator;