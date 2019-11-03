import axios from "axios";

export const createSubscription = subscription => {
  return axios({
    method: "POST",
    url: `/api/subscriptions`,
    data: {
      subscription: {
        plan_id: subscription.plan_id
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
