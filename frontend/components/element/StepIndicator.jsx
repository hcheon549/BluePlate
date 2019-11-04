import React from 'react';
import Checkmark from '../element/Check';


const StepIndicator = ({activeStep}) => {
  return (
    <div style={{ margin: 'auto'}}>
      <ul className='stepIndicator'>
        <li className={'miniText stepLink ' + (activeStep=='account' && ' -active')}>
          <span>{activeStep !== 'account' ? <Checkmark color={'#11afe2'} /> : "1. " }</span>
          <span>&nbsp;{"Account"}</span>
        </li>

        <li style={{ flexGrow: 2 }}><div className='line'/></li>

        <li className={'miniText stepLink ' + (activeStep == 'shipping' && ' -active')}>
          <span>{(activeStep == 'billing' || activeStep == 'orderReview')? <Checkmark color={'#11afe2'} /> : "2."}</span>
          <span>&nbsp;{"Plan"}</span>
        </li>

        <li style={{flexGrow: 2}}><div className='line' /></li>

        <li className={'miniText stepLink ' + (activeStep == 'billing' && ' -active')}>
          <span>{"3."}</span>
          <span>&nbsp;{"Billing"}</span>
        </li>
      </ul>
    </div > 
  );
}

export default StepIndicator;