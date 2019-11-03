import * as subscriptionApiUtil from "../util/subscription_api_util";

export const RECEIVE_SUBSCRIPTION = "RECEIVE_SUBSCRIPTION";
export const REMOVE_SUBSCRIPTION = "REMOVE_SUBSCRIPTION";
export const RECEIVE_SUBSCRIPTION_ERRORS = "RECEIVE_SUBSCRIPTION_ERRORS";

export const createSubscription = subscription => dispatch => {
  return subscriptionApiUtil.createSubscription(subscription).then(
    subscriptionS => {
      return dispatch(receiveSubscription(subscriptionS.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

const receiveSubscription = subscription => {
  return {
    type: RECEIVE_SUBSCRIPTION,
    subscription
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_SUBSCRIPTION_ERRORS,
    errors
  };
};
