import axios from "axios";

export const writeAccountHistory = (data) => {
  return axios({
    method: "POST",
    url: `/api/account_histories`,
    data: {
      account_history: {
        user_id: data.userId,
        action_type: data.action_type,
        action_data: data.action_data,
        resource_id: data.resource_id,
        memo: data.memo
      }
    }
  });
};
