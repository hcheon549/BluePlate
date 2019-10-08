import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/meal_actions';
import { fetchCities } from '../../actions/city_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { resetFilter } from '../../actions/filter_actions';
import { fetchReservations } from '../../actions/reservation_actions';
import { withRouter } from 'react-router-dom';
import Greeting from './greeting';

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    loading: state.ui.loading.fetchLoading
  };
};

const mdp = (dispatch) => {
  return {
    fetchMeals: (city) => dispatch(fetchMeals(city)),
    fetchCities: () => dispatch(fetchCities()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    fetchReservations: () => dispatch(fetchReservations()),
    resetFilter: () => dispatch(resetFilter())
  };
};

export default withRouter(connect(msp, mdp)(Greeting));
