json.extract! user, :id, :email, :fname, :lname, :enrolled_school, :school_id
if user.policy
  json.extract! user.policy, :policy_type
end