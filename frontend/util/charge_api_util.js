import axios from "axios";

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
    data => {
      return () => console.log('SUCCESS IN charge_api_util', data)
    },
    errors => console.log('FAILED in charge_api_util', errors)
  )
}