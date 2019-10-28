import * as planApiUtil from "../util/plan_api_util";

export const RECEIVE_ALL_PLANS = "RECEIVE_ALL_PLANS";
export const RECEIVE_PLAN_ERRORS = "RECEIVE_PLAN_ERRORS";

export const fetchPlans = plan => dispatch => {
  return planApiUtil.fetchPlans(plan).then(
    payload => {
      return dispatch(receivePlans(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

const receivePlans = plans => {
  return {
    type: RECEIVE_ALL_PLANS,
    plans
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_PLAN_ERRORS,
    errors
  };
};
