import React from 'react'
import moment from 'moment'

import ChangeEmailForm from '../element/ChangeEmailForm';
import PromoInputField from '../element/PromoInputField';

class SubscriptionSummary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showPromoInput: false,
    };

    this.calculateTotal = this.calculateTotal.bind(this);
    this.togglePromoInput = this.togglePromoInput.bind(this);
  }

  togglePromoInput(){
    this.setState({
      showPromoInput: !this.state.showPromoInput
    })
  }

  calculateTotal(){
    let { currentPlan, promoApplied } = this.props

    let planPrice, promoCode, discount, adjustment, discountAmount, planTotal, tax, todayTotal;
    if (promoApplied){
      planPrice = Math.round(currentPlan.price * 100) / 100;
      promoCode = promoApplied.code;
      adjustment = promoApplied.adjustmentType;
      discount = promoApplied.adjustmentValue;
      discountAmount = promoApplied.adjustmentType == 'Fixed'
        ? discount * -1
        : Math.round(planPrice * discount) / 100;
      planTotal = planPrice - discountAmount;
      tax = Math.round(planTotal * 6.625) / 100;
      todayTotal = Math.round((planTotal + tax) * 100) / 100;
    } else {
      planPrice = Math.round(currentPlan.price * 100) / 100
      promoCode = null;
      discount = null;
      adjustment = null;
      discountAmount = null;
      planTotal = planPrice
      tax = Math.round(planTotal * 6.625) / 100;
      todayTotal = Math.round((planTotal + tax) * 100) / 100;
    }

    this.props.setChargePrice(todayTotal);

    return { planPrice, promoCode, discount, adjustment, discountAmount, planTotal, tax, todayTotal }
  }

  render() {
    let { currentUser, currentPlan, toggleUpdateForm, updateEmail,
          updateUserEmail, setStep, errors, clearErrors } = this.props;

    let { planPrice, promoCode, discount, adjustment, discountAmount, planTotal, tax, todayTotal } = this.calculateTotal()
    let [ start_date, renew_date ] = [currentUser.subscription.subscriptionStart, currentUser.subscription.subscriptionEnd].map((date) => moment(date).format('MMMM Do, YYYY'))
    let buttonText = updateEmail ? 'Cancel' : 'Change';
    let additionalPromoInfo = adjustment == "Percent" ? `(${discount}% OFF)` : "";

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
              <p>{start_date}</p>
            </div>
            <div className="row -right">
              <h4>Renewal Date</h4>
              <p>{renew_date}</p>
            </div>
          </div>

          <div className="promo">
            <div className="havePromo" onClick={this.togglePromoInput}>Have a promo code?</div>
            {this.state.showPromoInput && 
              <PromoInputField 
                currentUser={currentUser}
                calculateTotal={this.calculateTotal}
                togglePromoInput={this.togglePromoInput}
              />}
          </div>
          
          <div className="divider" />
          <div className="infoSection -billing">
            <div className="checkout">
              <p>Plan Price</p>
            {/* </div>
            <div className="row -right"> */}
              <p>${planPrice.toFixed(2)}</p>
            </div>

            {promoCode &&
            <div className="promoField">
              <div className="checkout">
                <p>Discount {promoCode} {additionalPromoInfo}</p>
              {/* </div> */}
              {/* <div className="row -right"> */}
                <p>-${discountAmount}</p>
              </div>
            </div>}
            
            
            <div className="checkout">
              <p>Est. tax</p>
            {/* </div>
            <div className="row -right"> */}
              <p>${tax.toFixed(2)}</p>
            </div>
          </div>
          <div className="infoSection -billing">
            <div className="checkout">
              <p><span>Today's Total</span></p>
            {/* </div>
            <div className="row -right"> */}
              <p><span>${todayTotal.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SubscriptionSummary;