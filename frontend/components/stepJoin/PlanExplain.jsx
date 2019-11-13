import React from "react";

const talkingPoints = [
  'Meals can be ordered until the last day of this semester. There is no weekly commitments.',
  'Meals can be ordered everyday except holidays.',
  'Total number of meal credits are prorated.',
  'There is no big up-front cost.',
  'The payments will be made on the 1st week, 6th week, and 11th week',
  'You can order for up to two, whether it\'s for your late night munchies or to share with your friends, it\'s up to you to use however you want.',
  'Lunches must be ordered before 10:30AM, and Dinners must be ordered before 4PM, the day of',
  'BluePlate is an exciting and new start-up. If you are around, you will see us grow much like you will during your time in college!'
]

const PlanExplain = () => (
  <div className="PlanExplaination">
    <h4>Details you need to know.</h4>
    <ul>
      {talkingPoints.map(point => (
        <li className="miniText">{point}</li>
      ))}
    </ul>
  </div>
);

export default PlanExplain;
