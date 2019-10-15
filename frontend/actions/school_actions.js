import * as schoolApiUtil from "../util/school_api_util";

export const RECEIVE_ALL_SCHOOLS = "RECEIVE_ALL_SCHOOLS";
export const RECEIVE_SCHOOL_ERRORS = "RECEIVE_SCHOOL_ERRORS";

export const fetchSchools = school => dispatch => {
  return schoolApiUtil.fetchSchools(school).then(
    payload => {
      return dispatch(receiveSchools(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

const receiveSchools = schools => {
  return {
    type: RECEIVE_ALL_SCHOOLS,
    schools
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_SCHOOL_ERRORS,
    errors
  };
};
