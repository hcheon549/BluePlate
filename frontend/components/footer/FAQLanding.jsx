
import React from 'react';
import FAQ from './FAQ';

const Questions = [
  'What is BluePlate?',
  'What are the membership plans and how much do they cost?',
  'How do I use BluePlate?',
  'Where can I use BluePlate?',
  'When is BluePlate available?',
  'What does my plan cover?',
  'When does my BluePlate start and end?',
  'How do I pick up my meal?',
  'Does BluePlate deliver?',
  'How do I make a change to my plan?',
  'Can I cancel my plan?',
  'As a parent, how can I sign up the BluePlate meal plan for my child(ren)?'
]

const Answers = [
  <div>
    <p>BluePlate offers an affordable meal plan subscriptions giving you access to the local restaurants in your campus for less than $6 per meal. We provide a fast, fun, and efficient system to get you delicious and affordable meals every day.</p>
    <p>BluePlate members can reserve meals from any participating restaurant. Each restaurant offers one of their signature dishes daily.</p>
  </div>,
  <div>
    <p>BluePlate offers three options every semester:</p>
    <ol>
      <li>1. 12 Meals per week plan, $5.99 per meal, plus tax and fees.</li>
      <li>2. 8 Meals per week plan, $6.49 per meal, plus tax and fees.</li>
      <li>3. 4 Meals per week plan, $6.99 per meal, plus tax and fees.</li>
    </ol>
    <p>The total number of meals you can order can be obtained by multiplying the number of weeks left until the end of the semester according to your university’s official academic calendar times the number of meals per week specified in your plan. The total cost of the plan can be obtained by multiplying the number of meals by the average per meal price.</p>
    <p><strong>Example 1.</strong></p>
    <p>A student signing up for a 12 Meals per week plan in the beginning of a 15-week semester will get the total of 180 meal credits for the semester at the cost of $1,078.20 ($5.99 per meal times 180 meal credits). That is up to 50% discount from a typical traditional meal plan offered by a university!</p>
    <p><strong>Example 2.</strong></p>
    <p>A student signing up for an 8 Meals per week plan in the middle of the 4th week of a 12-week semester will get the total number of 72 meal credits for the semester (9 weeks until the end of the semester times 8 meals per week) at the cost of $467.28 ($6.49 per meal times 72 meal credits).</p>
    <p>Your state and local taxes may be applied.</p>
  </div>,
  <div>
    <p><strong>For lunch:</strong></p>
    <p>After subscribing to one of our meal plans you will be able to start reserving lunch. The BluePlate lunch kitchen opens daily at 8:00 PM, local time. The lunch kitchen closes at 10:30 AM the next morning. Log in while the lunch kitchen is open to reserve your lunch. Participating restaurants offer daily lunch options. If you wish to change your lunch reservation to a different meal, you can cancel your reservation and select another meal as long as you do this in advance of 10:30am.</p>
    <p><strong>For dinner:</strong></p>
    <p>The dinner kitchen opens at 8:00 PM on the day before you will pick up your dinner (the same time as the lunch kitchen). The dinner kitchen closes at 4:00 PM the following day - the day of pickup. Log in while the dinner kitchen is open to reserve your dinner. Participating restaurants offer daily dinner options.</p>
    <p>Whether it’s for your late night munchies or to share with your friends, we allow you to reserve up to three lunch items and three dinner items per day. The maximum meals you can order per day is 4 items.</p>
  </div>,
  <div>
    <p>You can get meals at any participating restaurant in the BluePlate network.</p>
    <p>BluePlate meal plans are currently available for students, faculty and community members of the Rutgers University-New Brunswick Campus. But we are a fast growing startup! If you want us to reach to your campus, please, contact us!</p>
  </div>,
  <div>
    <p>BluePlate is available everyday except on the following holidays: New Year’s Day, Memorial Day, July 4th, Labor Day, Thanksgiving Day, the day after Thanksgiving, and Christmas Day.</p>
    <p>In cases where Christmas and/or New Year’s fall on a weekend, it is possible that BluePlate will observe that holiday on the closest weekday.</p>
  </div>,
  <div>
    <p>Your meal plan covers 100% of the cost of your meal, whether it’s for lunch or dinner. There are no additional charges.</p>
  </div>,
  <div>
    <p>Your BluePlate cycle begins the day you sign up for one of our plans. Your cycle will last until the last day of the semester according to the university’s official academic calendar. Please, refer to your university’s official website for the exact date.</p>
  </div>,
  <div>
    <p>In order to pickup your meal, you must have the order confirmation page that we email to you. There will be two emails that we will send you:</p>
    <ol>
      <li>1. our order confirmation email confirming your order and 1 the pick-up time,</li>
      <li>2. ick-up code that you can use when you pick up your order. You will receive your order confirmation email as soon as you order your meal. You will receive the pick-up code an hour before your pick-up time.</li>
    </ol>
    <p>Once at the restaurant, you can tell your pick-up code at the designated pick-up location inside the restaurant. The patron will match your pick-up code with their record, and you will be able to pick up the meal.</p>
    <p>We are currently in development of utilizing your mobile devices for the order verification and pick-up process!</p>
  </div>,
  <div>
    <p>At this moment, meals reserved on BluePlate are for pick up only. As a fast growing start-up, we are looking at innovative ideas of getting delicious meals into your hands in more convenient and efficient way. If you have any ideas, feel free to contact us. Your suggestions are extremely valuable, and we will do our best to make our service better for all of you!</p>
  </div>,
  <div>
    <p>Changes in your meal plan can be made during the first and the second week of your semester. If you make a change, your previous meals that you already ordered will be charged at the rate of the new plan you make a change to. The difference in rates for the previous meals will be reflected in the future transaction.</p>
  </div>,
  <div>
    <p>The last day to cancel your plan without any conditions is the first week of the start of your plan. We want you to try our meal plan, but if you don’t think it’s the right plan for you, you may do so during that period.</p>
    <p>If there are any changes in your student status with the university, we can make a change or cancellation to your plan with the proof of the changes in your status with the university. Please contact us for more details.</p>
  </div>,
  <div>
    <p>Please email us at hello@BluePlate.io and we can help set up an account for your child(ren)!</p>
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
    <section className="content FAQs">
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