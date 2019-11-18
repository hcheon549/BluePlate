debugger
json.extract! user, :id, :email, :fname, :lname, :school_id, :enrolled_school
if user.policy
  json.extract! user.policy, :policy_type
end