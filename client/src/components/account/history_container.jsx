import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/meal_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { fetchReservations } from '../../actions/reservation_actions';
import { withRouter } from 'react-router-dom';
import History from './history';
import {
   getFavIds,
   getSchoolReservations
    } from '../../util/selectors';

const msp = ({entities:
  {users, meals, shops, schools, favorites, reservations},
  session, errors, ui}) => {

  let schoolReses = getSchoolReservations(reservations, meals, false);
  schoolReses = schoolReses.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });

  let favIds = getFavIds(favorites);

 return {
    currentUser: users[session.id],
    meals: meals,
    favIds: favIds,
    schoolReses: schoolReses,
    shops: shops
  };
};

const mdp = (dispatch) => {
 return {
   fetchMeals: (school) => dispatch(fetchMeals(school)),
   fetchFavorites: () => dispatch(fetchFavorites()),
   fetchReservations: () => dispatch(fetchReservations())
 };
};

export default withRouter(connect(msp, mdp)(History));
