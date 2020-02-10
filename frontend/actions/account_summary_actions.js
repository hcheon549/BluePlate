import * as accountSummaryApiUtil from "../util/account_summary_api_util";

export const SET_POLICY_TYPE = "SET_POLICY_TYPE";
export const RECEIVE_SUMMARY_ERRORS = 'RECEIVE_SUMMARY_ERRORS';
export const GET_ACCOUNT_SUMMARY = 'GET_ACCOUNT_SUMMARY';

export const showAccountSummary = userId => dispatch => {
  return accountSummaryApiUtil.showAccountSummary(userId).then(
    summaryS => {
      return dispatch(getAccountSummary(summaryS.data))
    },
    errors => {
      return dispatch(receiveErrors(errors.response.data))
    }
  )
}

export const createAccountSummary = userId => dispatch => {
  return accountSummaryApiUtil.createAccountSummary(userId).then(
    summaryS => {
      return dispatch(setAccountSummary(summaryS.data, "Visitor"));
    },
    errors => {
      return dispatch(receiveErrors(errors.response.data));
    }
  );
};

export const updateAccountSummary = summaryData => dispatch => {
  return accountSummaryApiUtil.updateAccountSummary(summaryData).then(
    summaryS => {
      return dispatch(setAccountSummary(summaryS.data, "Lead"));
    },
    errors => {
      return dispatch(receiveErrors(errors.response.data));
    }
  );
};

export const joinMembership = summaryData => dispatch => {
  return accountSummaryApiUtil.joinMembership(summaryData).then(
    summaryS => {
      return dispatch(setAccountSummary(summaryS.data, "Member"));
    },
    errors => {
      return dispatch(receiveErrors(errors.response.data));
    }
  );
};

const getAccountSummary = (data) => {
  return {
    type: GET_ACCOUNT_SUMMARY,
    data,
  }
}

export const setAccountSummary = (data, policy_type) => {
  return {
    type: SET_POLICY_TYPE,
    payload: {...data, policy: policy_type}
  }
}

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SUMMARY_ERRORS,
    errors
  }
}