
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

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();

const fullDate = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

const Answers = [
  <div>
    <p>BluePlattr offers affordable, convenient and flexible meal plan subscriptions giving members access to the local restaurants on and around your campus. BluePlattr aims to provide you with a quick, simple and convenient system for you to get affordable meals every day.</p>
    <p>BluePlattr members can reserve meals from any participating restaurant during when the kitchen is open. Each restaurant offers one of their signature dishes everyday as a daily special for members to choose from.</p>
  </div>,
  <div>
    <p>BluePlattr offers three options every semester:</p>
    <ol>
      <li>1. 12 Meals per week plan, $4.99 per meal, plus taxes and fees.</li>
      <li>2. 8 Meals per week plan, $5.49 per meal, plus taxes and fees.</li>
      <li>3. 4 Meals per week plan, $5.99 per meal, plus taxes and fees.</li>
    </ol>
    <p>Please remember that your state and local taxes may applied.</p>
  </div>,
  <div>
    <p>As you might have guessed from the above, your BluePlattr cycle will begin the first day of your academic term that you sign up (please refer to your academic calendar). In the same vein, your BluePlattr cycle will end on the last day of your academic term. Simply, it is according to the university’s official academic calendar. </p>
  </div>,
  <div>
    <p>As of {fullDate}, BluePlattr meal plans are currently available for students, faculty and community members of the Rutgers University-New Brunswick Campus. BluePlattr meal credits can be used at any participating restaurant in the BluePlattr network!</p>
    <p>Please contact us if you wish us to reach your campus.</p>
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
    <p>Once you subscribe to one of the meal plans, you are ready to order your meals. BluePlattr lunch kitchen opens daily at 9:00 PM, the day before. BluePlattr lunch kitchen closes at 10:00 AM the day you will be picking up your lunch. Log in while BluePlattr lunch kitchen is open to reserve your choice of lunch. Participating restaurants offer daily lunch options. If you wish to change your lunch reservation, you may do so by selecting another meal and pick-up time provided that you make the change before 10:00 AM.</p>
    <p>If you would like to get dinner:</p>
    <p>BluePlattr dinner kitchen will open at 9:00 PM the day before, same time as the lunch kitchen. However, BluePlattr dinner kitchen closes at 4:00 PM the day you will be picking up your dinner. Log in while BluePlattr dinner kitchen is open to reserve your choice of dinner. Participating restaurants offer daily dinner options. If you wish to change your dinner reservation, you may do so by selecting another meal and pick-up time provided that you make the change before 4:00 PM.</p>
  </div>,
  <div>
    <p>Once you order through BluePlattr platform, we will send you an order confirmation with a unique pick-up code via email. In order to pickup your meal, you must take the order confirmation page and tell the pick-up code to the restaurant.</p>
    <p>Once at the restaurant, you can show your pick-up code at the designated pick-up location inside the restaurant. The restaurant will match your pick-up code with their record, and you will be able to pick up the meal.</p>
    <p>We are currently in development of utilizing your mobile devices for the order verification and pick-up process! So stay tuned!</p>
  </div>,
  <div>
    <p>Unfortunately, no. At this moment, meals reserved on BluePlattr are for pick up only. As a fast-growing start-up, we are looking at innovative ideas of getting delicious meals into your hands in a more convenient and efficient way. If you have any ideas, feel free to contact us. Your suggestions are extremely valuable, and we will do our best to make our service better for all of you!</p>
  </div>,
  <div>
    <p>Changes in your meal plan can be made during the first and the second week of your academic term. If you make a change, the previous meals that you already ordered will be charged at the rate of the new plan you make a change to. The difference in rates for the previous meals will be reflected in the future transaction.</p>
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
    <section className="footerPage">
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