import {
  RECEIVE_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION
} from '../actions/subscription_actions';
import merge from 'lodash/merge';

const subscriptionReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_SUBSCRIPTION:
      newState[action.subscription.id] = action.subscription;
      return newState;
    case REMOVE_SUBSCRIPTION:
      delete newState[action.subscription.id];
      return newState;
    default:
      return oldState;
  }
};


export default subscriptionReducer;
