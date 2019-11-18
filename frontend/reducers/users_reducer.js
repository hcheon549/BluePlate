import {
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

import {
  RECEIVE_USER
} from '../actions/user_actions';

import {
  RECEIVE_RESERVATION,
  REMOVE_RESERVATION
} from '../actions/reservation_actions';

import {
  SET_POLICY_TYPE
} from '../actions/account_summary_actions';

import {
  SET_POLICY
} from '../util/charge_api_util';

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {...state, ...action.user};
    case RECEIVE_USER:
      debugger
      return {...state, ...action.user};
    case SET_POLICY_TYPE:
      let { id, policy, mealCreditsLeft, totalMealCredits } = action.payload
      return {
        ...state,
        policy: policy,
        summary_id: id,
        meal_credits_left: mealCreditsLeft || null,
        total_meal_credits: totalMealCredits || null
      }
    //refactor here//
    case RECEIVE_RESERVATION:
      return {...state, ...action.user};;
    case REMOVE_RESERVATION:
      return {...state, ...action.user};;
    default:
      return state;
  }
};

export default usersReducer;
