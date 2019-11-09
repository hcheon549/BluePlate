import React from 'react'

const SubscriptionSummary = (props) => {
  return (
    <section className="SubscriptionSummary">
      {/* <div className="sectionHeader">
        <h5>Your Plan Summary</h5>
      </div> */}
      <div className="main-info">
        <div className="infoSection">
          <h4>Email</h4>
          <p>hcheon549@gmail.com</p>
        </div>
        <div className="infoSection">
          <h4>Your Meal Plan</h4>
          <p>8 Meals per Week Plan - Total 120 Meal credits</p>
        </div>
        <div className="infoSection">
          <div className="row -left">
            <h4>Plan Start Date</h4>
            <p>January 12, 2020</p>
          </div>
          <div className="row -right">
            <h4>Plan End Date</h4>
            <p>May 20, 2020</p>
          </div>
        </div>
        <div className="infoSection">
          <h4>Payment Schedule</h4>
          <div className="row -left">
            <p>Today</p>
          </div>
          <div className="row - right">
            <p>$345.56</p>
          </div>
          <div className="row -left">
            <p>Week 5 - February 24</p>
          </div>
          <div className="row -right">
            <p>$345.56</p>
          </div>
          <div className="row -left">
            <p>Week 10 - April 6</p>
          </div>
          <div className="row -right">
            <p>$345.56</p>
          </div>
        </div>
        <div className="divider" />
        <div className="infoSection">
          <div className="row -left">
            <p>Subtotal</p>
          </div>
          <div className="row -right">
            <p>$345.67</p>
          </div>
          <div className="row -left">
            <p>Est. tax</p>
          </div>
          <div className="row -right">
            <p>$21.34</p>
          </div>
        </div>
        <div className="infoSection">
          <div className="row -left">
            <p>Today's Total</p>
          </div>
          <div className="row -right">
            <p>$367.01</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscriptionSummary