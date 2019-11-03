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
      newState[action.sub.id] = action.sub;
      return newState;
    case REMOVE_SUBSCRIPTION:
      delete newState[action.subId];
      return newState;
    default:
      return oldState;
  }
};


export default subscriptionReducer;
