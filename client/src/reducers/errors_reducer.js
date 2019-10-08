import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import mealErrorsReducer from './meal_errors_reducer';
import cityErrorsReducer from './city_errors_reducer';
import userErrorsReducer from './user_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: userErrorsReducer,
  meals: mealErrorsReducer,
  cities: cityErrorsReducer
});

export default errorsReducer;
