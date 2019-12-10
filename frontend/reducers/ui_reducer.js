import {
  combineReducers
} from 'redux';

import loadingReducer from './loading_reducer';
import filtersReducer from './filters_reducer';
import modalReducer from './modal_reducer';
import stepJoinReducer from './stepJoin_reducer';
import signatureReducer from './signature_reducer';
import leadReducer from './lead_reducer';

const uiReducer = combineReducers({
  loading: loadingReducer,
  filters: filtersReducer,
  modal: modalReducer,
  stepJoin: stepJoinReducer,
  disclaimerSignature: signatureReducer,
  emailCapture: leadReducer
});

export default uiReducer;