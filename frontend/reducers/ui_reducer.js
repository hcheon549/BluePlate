import {
  combineReducers
} from 'redux';

import loadingReducer from './loading_reducer';
import filtersReducer from './filters_reducer';
import modalReducer from './modal_reducer';
import stepJoinReducer from './stepJoin_reducer';
import signatureReducer from './signature_reducer';
import leadReducer from './lead_reducer';
import burgerReducer from './burger_reducer';
import passwordResetReducer from './password_reset_reducer'

const uiReducer = combineReducers({
  loading: loadingReducer,
  filters: filtersReducer,
  modal: modalReducer,
  stepJoin: stepJoinReducer,
  disclaimerSignature: signatureReducer,
  leadCapture: leadReducer,
  burger: burgerReducer,
  passwordReset: passwordResetReducer
});

export default uiReducer;