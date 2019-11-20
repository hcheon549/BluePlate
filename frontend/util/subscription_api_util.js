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

export const updateSubscription = subscriptionData => {
  return axios({
    method: "PATCH",
    url: `/api/subscriptions/${subscriptionData.subscriptionId}`,
    data: {
      subscription: {
        plan_id: subscriptionData.plan_id,
        meals: subscriptionData.meals
      }
    }
  });
};