import axios from "axios";

export const createAccountSummary = (userId) => {
  return axios({
    method: "POST",
    url: `/api/account_summaries`,
    data: {
      account_summary: {
        user_id: userId,
      }
    }
  });
};

export const updateAccountSummary = (summaryData) => {
  return axios({
    method: "PATCH",
    url: `/api/account_summaries/${summaryData.id}`,
    data: {
      account_summary: {
        subscription_id: summaryData.subscription_id,
        policy_type: summaryData.policy_type
      }
    }
  });
};