import axios from "axios";

export const RECEIVE_PASSWORD_RESET_RESPOSE = "RECEIVE_PASSWORD_RESET_RESPOSE";
export const RECEIVE_PASSWORD_RESET_RESPONSE_ERROR = "RECEIVE_PASSWORD_RESET_RESPONSE_ERROR";

export const updateUserPassword = resetData => dispatch => {
  return updatePassword(resetData).then(
    result => {
      return dispatch(receiveResponse(result.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}

export const resetUserPassword = data => dispatch => {
  return resetPassword(data).then(
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

const resetPassword = resetData => {
  return axios({
    method: "PATCH",
    url: `api/password_resets/${resetData.password_reset_token}`,
    data: {
      password: resetData.newPassword
    }
  })
}


const receiveResponse = response => {
  return {
    type: RECEIVE_PASSWORD_RESET_RESPOSE,
    response
  };
};

const receiveErrors = error => {
  return {
    type: RECEIVE_PASSWORD_RESET_RESPONSE_ERROR,
    error
  };
};