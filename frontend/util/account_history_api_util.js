import axios from "axios";

export const showAccountHistory = (userId) => {
  return axios({
    method: "GET",
    url: `/api/account_histories/${userId}`
  })
}

export const createAccountHistory = (data) => {
  return axios({
    method: "POST",
    url: `/api/account_histories`,
    data: {
      account_history: {
        user_id: data.userId,
        action_type: data.action_type,
        action_data: data.action_data || null,
        resource_id: data.resource_id || null,
        memo: data.memo || null
      }
    }
  });
};