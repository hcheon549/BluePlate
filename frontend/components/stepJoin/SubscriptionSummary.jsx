import React from 'react'

import ChangeEmailForm from '../element/ChangeEmailForm';
import PromoInputField from '../element/PromoInputField';

class SubscriptionSummary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showPromoInput: false,
    };

    this.togglePromoInput = this.togglePromoInput.bind(this);
  }

  togglePromoInput(){
    this.setState({
      showPromoInput: !this.state.showPromoInput
    })
  }

  render() {
    let { currentUser, currentPlan, toggleUpdateForm, updateEmail,
          updateUserEmail, setStep, errors, clearErrors } = this.props;

    if (!currentPlan){
      return <div />
    }
    
    let tax = Math.round(currentPlan.price * 6.625) / 100;
    let totalPayment = Math.round((currentPlan.price + tax) * 100) / 100;
    let buttonText = updateEmail ? 'Cancel' : 'Change';

    return (
      <section className="SubscriptionSummary">
        <div className="sectionHeader">
          <h5>Your Plan Summary</h5>
        </div>
        <div className="main-info">
          <div className="infoSection">
            <h4>Email  -  <span className="link emailUpdate" onClick={toggleUpdateForm}>{buttonText}</span></h4>
            {updateEmail ? 
              <ChangeEmailForm 
                currentUser={currentUser}
                updateUserEmail={updateUserEmail}
                errors={errors}
                clearErrors={clearErrors}
                toggleUpdateForm={toggleUpdateForm}
              /> 
            : <p>{currentUser.email}</p>}
          </div>
          <div className="infoSection">
            <h4>Your Meal Plan  -  <span className="link emailUpdate" onClick={()=> setStep('plan')}>Change</span></h4>
            <p>{currentPlan.name} per Week Plan - Total {currentPlan.meals} Meal credits</p>
          </div>
          <div className="infoSection">
            <div className="row -left">
              <h4>Plan Start Date</h4>
              <p>January 21, 2020</p>
            </div>
            <div className="row -right">
              <h4>Renewal Date</h4>
              <p>February 11, 2020</p>
            </div>
          </div>

          <div className="promo">
            <div className="havePromo" onClick={this.togglePromoInput}>Have a promo code?</div>
            {this.state.showPromoInput && 
              <PromoInputField 
                currentUser={currentUser}
              />}
          </div>
          
          <div className="divider" />
          <div className="infoSection -billing">
            <div className="row -left">
              <p>Subtotal</p>
            </div>
            <div className="row -right">
              <p>${currentPlan.price.toFixed(2)}</p>
            </div>
            <div className="row -left">
              <p>Est. tax</p>
            </div>
            <div className="row -right">
              <p>${tax.toFixed(2)}</p>
            </div>
          </div>
          <div className="infoSection -billing">
            <div className="row -left">
              <p><span>Today's Total</span></p>
            </div>
            <div className="row -right">
              <p><span>${totalPayment.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SubscriptionSummary;