import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import mealReducer from './meal_reducer';
import shopReducer from './shop_reducer';
import schoolReducer from './school_reducer';
import favoriteReducer from './favorite_reducer';
import reservationReducer from './reservation_reducer';
import mealResReducer from './meal_res_reducer';
import shopResReducer from './shop_res_reducer';
import planReducer from './plans_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  meals: mealReducer,
  mealRes: mealResReducer,
  shops: shopReducer,
  shopRes: shopResReducer,
  schools: schoolReducer,
  plans: planReducer,
  favorites: favoriteReducer,
  reservations: reservationReducer
});

export default entitiesReducer;
