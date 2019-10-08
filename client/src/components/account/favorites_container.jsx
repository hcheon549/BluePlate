import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/meal_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { withRouter } from 'react-router-dom';
import Favorites from './favorites';
import {
   getFavorites,
   getFavMeals
    } from '../../util/selectors';

const msp = ({entities:
  {users, meals, shops, cities, favorites},
  session, errors, ui}) => {

  let favs = getFavorites(favorites);
  let mealsFavs = getFavMeals(Object.values(meals), favs, true);

 return {
    currentUser: users[session.id],
    meals: mealsFavs,
    shops: shops
  };
};

const mdp = (dispatch) => {
 return {
   fetchMeals: (city) => dispatch(fetchMeals(city)),
   fetchFavorites: () => dispatch(fetchFavorites())
 };
};

export default withRouter(connect(msp, mdp)(Favorites));
