import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Reservations from './reservations';
import {
  updateReservation,
  deleteReservation
} from '../../actions/reservation_actions';
import { getSchoolReservations, getPastFive } from '../../util/selectors';
import { changeFilter } from '../../actions/filter_actions';

const msp = ({entities: {users, mealRes, shopRes, reservations}, session}) => {


  let schoolReservations = getSchoolReservations(reservations, mealRes, true);
  schoolReservations = schoolReservations.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });


  let pastFive = [[],[],[],[],[]];
  //get the reservations for the past 5 days
  //(including tomorrow) if there are any. if not, put blank.

  if (schoolReservations.length !== 0) {
    pastFive = getPastFive(schoolReservations);
  }


  let resTime =[];
  if (pastFive.length !== 0 ) {
    if (pastFive[0].length !== 0) {
      resTime = pastFive[0].time;
    }
  }


  return {
    currentUser: users[session.id],
    reservations: pastFive,
    meals: mealRes,
    shops: shopRes,
    resTime: resTime
  };
};

const mdp = (dispatch) => {
  return {
    updateReservation: (res) => dispatch(updateReservation(res)),
    deleteReservation: (id) => dispatch(deleteReservation(id)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default withRouter(connect(msp, mdp)(Reservations));
