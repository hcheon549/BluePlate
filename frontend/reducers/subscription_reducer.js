import {
  RECEIVE_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION
} from '../actions/subscription_actions';
import merge from 'lodash/merge';

const subscriptionReducer = (oldState = null, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SUBSCRIPTION:
      return action.subscription;
    // case REMOVE_SUBSCRIPTION:
    //   delete newState[action.subscription.id];
    //   return newState;
    default:
      return oldState;
  }
};


export default subscriptionReducer;
