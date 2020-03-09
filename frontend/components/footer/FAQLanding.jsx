
import React from 'react';
import FAQ from './FAQ';

const Questions = [
  'What is BluePlattr?',
  'When does my BluePlattr subscription work?',
  'How much is the meal plan?',
  'Are there any additional charges at pick up?',
  'What do I get with my plan?',
  'Where can I use BluePlattr?',
  'When does my BluePlattr start and end?',
  'How do I use BluePlattr?',
  'How do I pick up my meal?',
  'What time can I pick up lunch and dinner?',
  'Can I order lunch and dinner for the same day?',
  'Can I order MORE than one lunch or one dinner in a day?',
  'Does BluePlattr deliver?',
  'Can I change my plan?',
  'Can I cancel my plan?',
  'As a parent, how can I sign up my child(ren) for a BluePlattr meal plan?'
]

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();

const fullDate = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

const Answers = [
  <div>
    <p>The “Blue Plate Special,” or as we call it “The BluePlattr,” was a term used in the United States from the 1920’s to the 1950’s and was an off-menu meal, served at diners and cafes, that changed daily. Each day, restaurants would decide on their “Blue Plate” and serve the same dish to all who ordered until they ran out. A web collection of 1930s prose gives the definition: "A Blue Plate Special is a low-priced daily diner special: a main course with all the fixins, a daily combo, a square for two bits."</p>
    <p>We have decided to bring it back, with a modern twist! BluePlattr allows restaurants to create their single, daily BluePlattr specials, which are only accessible to users via the BluePlattr platform. With dozens of your favorite restaurants offering lunch and dinner daily, you’ll never run out of delicious and creative options to choose from!</p>
    <p>BluePlattr offers affordable, convenient, and flexible meal plan subscriptions giving users access to local restaurants on and around your campus. BluePlattr aims to provide you with a quick, simple, and convenient system for you to get amazing lunch and dinner meals every day. Users select their lunch and/or dinner in advance through the BluePlattr website, as early as the night before, and pick it up at the time of their choosing. Deciding what to eat on a tight schedule and budget has never been easier.</p>
  </div>,
  <div>
    <p>BluePlattr plans are on a 4-week (28 day) cycle.</p>
    <p>After the first 1-week trial period, your account is automatically renewed to a 4-week cycle subscription of the same plan that you had chosen. All BluePlattr plans end on the last day of the semester. If you would like to change your plan before your next renewal date, please let us know by sending an email to support@blueplattr.com.</p>
  </div>,
  <div>
    <p>BluePlattr offers four options every semester:</p>
    <ol>
      <li>1. 12-Meals-per-Week plan, $5.99 per meal, plus taxes and fees.</li>
      <li>2. 9-Meals-per-Week plan, $6.39 per meal, plus taxes and fees.</li>
      <li>3. 6-Meals-per-Week plan, $6.69 per meal, plus taxes and fees.</li>
      <li>4. 3-Meals-per-Week plan, $6.99 per meal, plus taxes and fees.</li>
    </ol>
    <p>Please remember that your state and local taxes may applied.</p>
    <p>For example, the total cost for a 3-Meals-per-Week plan for a 4-week cycle is $83.88  plus tax. ($6.99 per meal x 3 meals per week x 4 weeks)</p>
  </div>,
  <div>
    <p>Nope! But you are more than welcome to purchase any additional items such as your favorite sides or drinks directly with the restaurant.</p>
  </div>,
  <div>
    <p>The meal plan you purchase will cover 100% of the cost of your meal, whether it’s for lunch or dinner!</p>
  </div>,
  <div>
    <p>As of {fullDate}, BluePlattr meal plans are currently available for students, faculty and community members of the Rutgers University-New Brunswick Campus. BluePlattr meal credits can be used at any participating restaurant in the BluePlattr network!</p>
    <p>BluePlattr not available at your campus? Reach out to us and we’ll get working on it! Just email us at support@blueplattr.com.</p>
  </div>,
  <div>
    <p>As you might have guessed from above, your BluePlattr cycle will begin the first day of your academic term that you sign up (please refer to your academic calendar). In the same vein, your BluePlattr cycle will end on the last day of your academic term. Simply put, it is in accordance with the university’s official academic calendar.</p>
  </div>,
  <div>
    <p>You can use BluePlattr to get your lunch or dinner, as follows:</p>
    <p><strong>Lunch:</strong></p>
    <p>Once subscribed to a meal plan, you can begin right away! BluePlattr lunch menu selections go live the night before at 9:00 PM. Users have until 10:00 AM on pickup day to select their lunch option. After you make your selection and select your pickup time, you will receive your unique four digit code which is shown to the staff at your favorite local restaurant when picking up. If you wish to change your lunch reservation, you may do so by selecting another meal and pick-up time, provided that you make the change before 10:00 AM.</p>
    <p>At 10:00 AM the menu is closed and you may no longer make changes or cancel your order. This is to assure that restaurants have adequate time to prepare your food to be ready for pick up at the time you selected.</p>
    <p><strong>Dinner:</strong></p>
    <p>Almost the exact same as lunch, except you have from 9:00 PM the night before up until 4:00PM the day of. Plenty of time to make your selection. Want to change your dinner selection? No problem! Just select a new option before 4:00 PM and you are good to go.</p>
    <p>However keep in mind that each restaurant has a limited number of BluePlattr meals per day, so first come, first serve. Don’t wait until the last minute!</p>
  </div>,
  <div>
    <p>Once you make your selection through the BluePlattr website, we will send you an order confirmation with a unique pick-up code via email. In order to pick up your meal, you must take the order confirmation page and show the pick-up code at the restaurant.</p>
    <p>The restaurant will match your pick-up code with their records, and will hand you the meal. Simple as that! No need to waste time standing in line and ordering at restaurants, simply show then go!</p>
    <p>Running late for your selected pick-up time? Make sure you call the restaurant directly and let them know! We can’t guarantee what a restaurant will do if you miss your pick-up window, so please try to reach out to them if you are going to be late. Unfortunately, if you place an order and end up not picking it up, you will still be charged for using a meal.</p>
    <p>We are currently in development of utilizing your mobile devices for the order verification and pick-up process! So stay tuned!</p>
  </div>,
  <div>
    <p>We know that most students don’t have the most routine of schedules, so we have given you a large window of pick up times.</p>
    <p>Lunch pick up begins at 11:30 AM with the last pick up at 3:00 PM<br/>Dinner pick up begins at 5:00 PM with the last pick up at 9:00 PM.</p>
    <p>Pick up times are in 15 minute intervals. This way, you know your meals will be made fresh just before you arrive, and ready to grab and go at your selected time. As we mentioned before, if you are running late, please contact your restaurant directly and let them know!</p>
  </div>,
  <div>
    <p>Absolutely! The meal plan you select is for the number of meals per week and can be used for lunch and/or dinner. For example, if you selected the meal plan, you can use it any way you see fit. Lunch and dinner on Saturday and Sunday? Go for it!</p>
  </div>,
  <div>
    <p>For now, users can only use one meal at a time for lunch and dinner. However, we do plan on implementing a system down the road where you can use your meal plan to select multiple meals for you and your friends.</p>
  </div>,
  <div>
    <p>Unfortunately, no. At this moment, meals reserved on BluePlattr are for pick up only. As a fast-growing start-up, we are looking at innovative ideas of getting delicious meals into your hands in a more convenient and efficient way. If you have any ideas, feel free to contact us. Your suggestions are extremely valuable, and we will do our best to make our service better for all of you!</p>
  </div>,
  <div>
    <p>Changes in your meal plan can be made during the first and second week of your academic term. If you make a change, the previous meals that you already ordered will be charged at the rate of the new plan you make a change to. The difference in rates for the previous meals will be reflected in the future transaction.</p>
  </div>,
  <div>
    <p>The last day to cancel your plan without any conditions is the first week of the start of your plan. We want you to try our meal plan, but if you don’t think it’s the right plan for you, you may do so during that period.</p>
    <p>If there are any changes in your student status with the university, we can make a change or cancellation to your plan with the proof of the changes in your status with the university. Please contact us for more details.</p>
  </div>,
  <div>
    <p>Please email us at support@blueplattr.com and we can help set up an account for your child(ren)!</p>
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