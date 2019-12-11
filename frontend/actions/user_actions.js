import * as userApiUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_LEAD = "RECEIVE_LEAD";
export const RECEIVE_LEAD_ERRORS = "RECEIVE_LEAD_ERRORS"

export const fetchUser = userId => dispatch => {
  return userApiUtil.getUser(userId).then(
    user => {
      return dispatch(receiveUser(user.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}

export const updateUser = user => dispatch => {
  return userApiUtil.updateUser(user).then(
    usr => {
      return dispatch(receiveUser(usr.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const updateUserEmail = userData => dispatch => {
  return userApiUtil.updateUserEmail(userData).then(
    usr => {
      return dispatch(receiveUser(usr.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}


export const updateUserName = userData => dispatch => {
  return userApiUtil.updateUserName(userData).then(
    usr => {
      return dispatch(receiveUser(usr.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}

export const updateUserMeals = user => dispatch => {
  return userApiUtil.updateUserMeals(user).then(
    usr => {
      return dispatch(receiveUser(usr.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}

///////////////////////////////////////////////////

export const createLeadCapture = leadData => dispatch => {
  return userApiUtil.createLead(leadData).then(
    lead => {
      return dispatch(receiveLead(lead.data))
    },
    errors => dispatch(receiveLeadErrors(errors.response.data))
  )
}

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors
  };
};

const receiveLead = lead => {
  return {
    type: RECEIVE_LEAD,
    lead
  }
}

const receiveLeadErrors = errors => {
  return {
    type: RECEIVE_LEAD_ERRORS,
    errors
  };
};
