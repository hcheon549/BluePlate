import axios from "axios";

export const createSubscription = subscription => {
  debugger
  return axios({
    method: "POST",
    url: `/api/subscription`,
    data: {
      subscription: {
        plan_id: subscription.planId
      }
    }
  });
};

// export const fetchSubscriptions = () => {
//   return axios({
//     method: "GET",
//     url: `/api/subscriptions`
//   });
// };

// export const deleteSubscription = id => {
//   return axios({
//     method: "DELETE",
//     url: `/api/subscriptions/${id}`
//   });
// };
