import axios from "axios";

export const SET_POLICY = "SET_POLICY";
export const RECEIVE_CHARGE_ERRORS = 'RECEIVE_CHARGE_ERRORS';

export const charge = chargeData => {
  return axios({
    method: "POST",
    url: '/api/charges',
    data: {
      chargeData: {
        stripeEmail: chargeData.stripeEmail,
        stripeToken: chargeData.stripeToken,
        customerId: chargeData.customerId,
        customerName: chargeData.customerName,
        amount: chargeData.amount,
        description: chargeData.description
      }
    }
  })
}

export const createCharge = chargeData => dispatch => {
  return charge(chargeData).then(
    charge => {
      debugger
      return dispatch(setPolicy(charge.data))
    },
    errors => {
      return dispatch(receiveChargeErrors(errors.response.data));
    }
  )
}

const setPolicy = payload => {
  return {
    type: SET_POLICY,
    policyType: payload.policyType
  }
}

const receiveChargeErrors = errors => {
  return {
    type: RECEIVE_CHARGE_ERRORS,
    errors
  }
}