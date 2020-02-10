import * as sessionApiUtil from "../util/session_api_util";
import * as accountApiUtil from '../util/account_summary_api_util';

import { changeFilter } from "./filter_actions";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const createAccount = user => dispatch => {
  return sessionApiUtil.createAccount(user).then(
    userS => {
      return dispatch(receiveCurrentUser(userS.data));
    },
    errors => {
      return dispatch(receiveErrors(errors.response.data));
    }
  );
};

export const login = user => dispatch => {
  return sessionApiUtil.login(user).then(
    userS => {
      return dispatch(receiveCurrentUser(userS.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const getCurrentUser = () => dispatch => {
  return sessionApiUtil.getCurrentUser().then(
    userS => {
      dispatch(receiveCurrentUser(userS.data));
      dispatch(changeFilter("fetchedUser", true));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const logout = () => dispatch => {
  return sessionApiUtil.logout().then(
    () => {
      return dispatch(logoutCurrentUser());
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: []
  };
};

export const setAccountSummary = (data, policy_type) => {
  return {
    type: SET_POLICY_TYPE,
    payload: {...data, policy: policy_type}
  }
}