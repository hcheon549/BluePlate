import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import menuErrorsReducer from './menu_errors_reducer';
import schoolErrorsReducer from './school_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
import planErrorsReducer from './plan_errors_reducer';
import chargeErrorsReducer from './charge_errors_reducer';
import accountHistoryErrorsReducer from './accountHistory_errors_reducer';
import promoErrorsReducer from './promo_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: userErrorsReducer,
  menus: menuErrorsReducer,
  schools: schoolErrorsReducer,
  plans: planErrorsReducer,
  charges: chargeErrorsReducer,
  accountHistory: accountHistoryErrorsReducer,
  promo: promoErrorsReducer
});

export default errorsReducer;
