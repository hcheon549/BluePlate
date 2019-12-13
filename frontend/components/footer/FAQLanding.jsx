
import React from 'react';
import FAQ from './FAQ';

const Questions = [
  'What is BluePlattr?',
  'How much is the meal plan?',
  'When does my BluePlattr start and end?',
  'Where can I use BluePlattr?',
  'What do I get with my plan?',
  'Is there any additional charge?',
  'Can I use BluePlattr on holidays?',
  'How do I use BluePlattr?',
  'How do I pick up my meal?',
  'Does BluePlattr deliver?',
  'Can I change my plan?',
  'Can I cancel my plan?',
  'As a parent, how can I sign up a BluePlattr meal plan for my child(ren)?'
]

const Answers = [
  <div>
    <p>What is BluePlattr?  BluePlattr offers an affordable meal plan subscriptions giving you access to the local restaurants on (or around) your campus for LESS THAN $5 PER MEAL. BluePlattr aims to provide you with a quick, simple and convenient system for you to get affordable meals every day.</p>
    <p>Simply put, BluePlattr members can reserve meals from any participating restaurant. Each restaurant offers one of their signature dishes everyday.</p>
  </div>,
  <div>
    <p>BluePlattr offers three options every semester:</p>
    <ol>
      <li>1. 12 Meals per week plan, $4.99 per meal, plus taxes and fees.</li>
      <li>2. 8 Meals per week plan, $5.49 per meal, plus taxes and fees.</li>
      <li>3. 4 Meals per week plan, $5.99 per meal, plus taxes and fees.</li>
    </ol>
    <p>Please remember that your state and local taxes may be applied.</p>

  </div>,
  <div>
    <p>As you might have guessed from the above, your BluePlattr cycle will begin the first day of your academic term that you sign up (please refer to your academic calendar). In the same vein, your BluePlattr cycle will end on the last day of your academic term. Simply, it is according to the university’s official academic calendar. </p>
  </div>,
  <div>
    <p>As of December 10, 2019, BluePlattr meal plans are currently available for students, faculty and community members of the Rutgers University-New Brunswick Campus. BluePlattr meal credits can be used at any participating restaurant in the BluePlattr network!</p>
    <p>Please contact us If you wish us to reach your campus.</p>
  </div>,
  <div>
    <p>The meal plan you purchase will cover 100% of the cost of your meal, whether it’s for lunch or dinner!</p>
  </div>,
  <div>
    <p>No. But you are more than welcome to purchase any additional items such as your favorite sides or a drink.</p>
  </div>,
  <div>
    <p>Except on holidays and official recesses as designated on your official university academic calendar, you will be able to use BluePlattr everyday.</p>
    <p>In cases where holidays fall on a weekend, BluePlattr may observe that holiday on the closest weekday.</p>
  </div>,
  <div>
    <p>You can use BluePlattr to get your lunch or dinner, as follows:</p>
    <p>If you would like to get lunch:</p>
    <p>Once you subscribe to one of the meal plans described above, please plan ahead and reserve lunch the night before. BluePlattr lunch kitchen opens daily at 9:00 PM (your time). BluePlattr lunch kitchen closes at 10:00 AM the next morning. Log in while BluePlattr lunch kitchen is open to reserve your choice of lunch. Participating restaurants offer daily lunch options. If you wish to change your lunch reservation, you may do so by selecting another meal and pick-up time provided that you make the change before 10:00am.</p>
    <p>If you would like to get dinner:</p>
    <p>BluePlattr dinner kitchen will open at 9:00 PM on the day immediately before you will pick up your dinner. The opening time of BluePlattr dinner kitchen is the same time as BluePlattr lunch kitchen. However, BluePlattr dinner kitchen will close at 4:00 PM the day you will be picking up your dinner. Log in while BluePlattr dinner kitchen is open to reserve your choice of dinner. Participating restaurants offer daily dinner options. If you wish to change your dinner reservation, you may do so by selecting another meal and pick-up time provided that you make the change before 4:00pm.</p>
  </div>,
  <div>
    <p>Once you order through BluePlattr platform, we will send you an order confirmation with a unique pick-up code via email. In order to pickup your meal, you must take the order confirmation page and tell the pick-up code to the restaurant.</p>
    <p>Once at the restaurant, you can show your pick-up code at the designated pick-up location inside the restaurant. The restaurant will match your pick-up code with their record, and you will be able to pick up the meal.</p>
    <p>We are currently in development of utilizing your mobile devices for the order verification and pick-up process!</p>
  </div>,
  <div>
    <p>Unfortunately, no. At this moment, meals reserved on BluePlattr are for pick up only. As a fast growing start-up, we are looking at innovative ideas of getting delicious meals into your hands in more convenient and efficient way. If you have any ideas, feel free to contact us. Your suggestions are extremely valuable, and we will do our best to make our service better for all of you!</p>
  </div>,
  <div>
    <p>Changes in your meal plan can be made during the first and the second week of your academic term. If you make a change, your previous meals that you already ordered will be charged at the rate of the new plan you make a change to. The difference in rates for the previous meals will be reflected in the future transaction.</p>
  </div>,
  <div>
    <p>The last day to cancel your plan without any conditions is the first week of the start of your plan. We want you to try our meal plan, but if you don’t think it’s the right plan for you, you may do so during that period.</p>
    <p>If there are any changes in your student status with the university, we can make a change or cancellation to your plan with the proof of the changes in your status with the university. Please contact us for more details.</p>
  </div>,
  <div>
    <p>Please email us at support@BluePlattr.com and we can help set up an account for your child(ren)!</p>
  </div>
]


const FAQLanding = () => {
  let labels = Questions.map((question, idx) =>
      <FAQ
        key={idx}
        question={question}
        answer={Answers[idx]}
      />
    );
  return(
    <section className="FAQs">
      <div className="pageHeader">
        <h3>Frequently Asked Questions</h3>
      </div>
      <div className="faqsQuestionWrapper">
        <ul>
          {labels}
        </ul>
      </div>
    </section>
  );
}

export default FAQLanding