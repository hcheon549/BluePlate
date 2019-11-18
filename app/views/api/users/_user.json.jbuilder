json.extract! user, :id, :email, :fname, :lname, :school_id, :enrolled_school

if user.policy
  json.extract! user.policy, :policy_type
end

if user.subscription
  json.set! :subscription do
    json.extract! user.subscription, :id, :user_id, :plan_id, :meal_credit, :subscription_start, :subscription_end
  end
end