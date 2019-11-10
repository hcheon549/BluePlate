import React from 'react'

const SubscriptionSummary = (props) => {
  let { currentUser, currentPlan, calculatePayment } = props
  let payments = calculatePayment(currentPlan.price)
  let tax = Math.round(parseFloat(payments[0]) * 6.625) / 100
  let totalPayment = Math.round((parseFloat(payments[0]) + tax) * 100) / 100
  debugger
  return (
    <section className="SubscriptionSummary">
      <div className="sectionHeader">
        <h5>Your Plan Summary</h5>
      </div>
      <div className="main-info">
        <div className="infoSection">
          <h4>Email</h4>
          <p>{currentUser.email}</p>
        </div>
        <div className="infoSection">
          <h4>Your Meal Plan</h4>
          <p>{currentPlan.name} per Week Plan - Total {currentPlan.meals} Meal credits</p>
        </div>
        <div className="infoSection">
          <div className="row -left">
            <h4>Plan Start Date</h4>
            <p>January 21, 2020</p>
          </div>
          <div className="row -right">
            <h4>Plan End Date</h4>
            <p>May 13, 2020</p>
          </div>
        </div>
        <div className="infoSection">
          <h4>Payment Schedule</h4>
          <div className="row -left">
            <p>Today</p>
          </div>
          <div className="row - right">
            <p>${payments[0]}</p>
          </div>
          <div className="row -left">
            <p>Week 5 - February 24</p>
          </div>
          <div className="row -right">
            <p>${payments[1]}</p>
          </div>
          <div className="row -left">
            <p>Week 10 - April 6</p>
          </div>
          <div className="row -right">
            <p>${payments[2]}</p>
          </div>
        </div>
        <div className="divider" />
        <div className="infoSection -billing">
          <div className="row -left">
            <p>Subtotal</p>
          </div>
          <div className="row -right">
            <p>${payments[0]}</p>
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

export default SubscriptionSummary