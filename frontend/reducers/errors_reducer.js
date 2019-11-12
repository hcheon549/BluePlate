import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import mealErrorsReducer from './meal_errors_reducer';
import schoolErrorsReducer from './school_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
import planErrorsReducer from './plan_errors_reducer';
import chargeErrorsReducer from './charge_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: userErrorsReducer,
  meals: mealErrorsReducer,
  schools: schoolErrorsReducer,
  plans: planErrorsReducer,
  charges: chargeErrorsReducer,
});

export default errorsReducer;
