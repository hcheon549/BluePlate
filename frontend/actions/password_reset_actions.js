import axios from "axios";

export const RECEIVE_PASSWORD_RESET_RESPOSE = "RECEIVE_PASSWORD_RESET_RESPOSE";
export const RECEIVE_PASSWORD_RESET_RESPONSE_ERROR = "RECEIVE_PASSWORD_RESET_RESPONSE_ERROR";

export const updateUserPassword = userEmail => dispatch => {
  return updatePassword(userEmail).then(
    result => {
      return dispatch(receiveResponse(result.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}

const updatePassword = userEmail => {
  return axios({
    method: "POST",
    url: 'api/password_resets',
    data: {
      email: userEmail
    }
  })
}

const receiveResponse = response => {
  debugger
  return {
    type: RECEIVE_PASSWORD_RESET_RESPOSE,
    response
  };
};

const receiveErrors = error => {
  debugger
  return {
    type: RECEIVE_PASSWORD_RESET_RESPONSE_ERROR,
    error
  };
};