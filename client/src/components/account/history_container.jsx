import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/meal_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { fetchReservations } from '../../actions/reservation_actions';
import { withRouter } from 'react-router-dom';
import History from './history';
import {
   getFavIds,
   getCityReservations
    } from '../../util/selectors';

const msp = ({entities:
  {users, meals, shops, cities, favorites, reservations},
  session, errors, ui}) => {

  let cityReses = getCityReservations(reservations, meals, false);
  cityReses = cityReses.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });

  let favIds = getFavIds(favorites);

 return {
    currentUser: users[session.id],
    meals: meals,
    favIds: favIds,
    cityReses: cityReses,
    shops: shops
  };
};

const mdp = (dispatch) => {
 return {
   fetchMeals: (city) => dispatch(fetchMeals(city)),
   fetchFavorites: () => dispatch(fetchFavorites()),
   fetchReservations: () => dispatch(fetchReservations())
 };
};

export default withRouter(connect(msp, mdp)(History));
