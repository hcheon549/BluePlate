json.extract! user, :id, :email, :fname, :lname, :school_id, :created_at

if user.policy
  json.extract! user.policy, :name, :description, :policy_type
end

if user.school
  json.set! :enrolled_school do
    json.extract! user.school, :id, :name, :latitude, :longitude
  end
end

if user.subscription
  json.set! :subscription do
    json.extract! user.subscription, :id, :plan_id, :meal_credit, :subscription_start, :subscription_end
  end
end

if user.account_summary
  json.set! :summary do
    json.extract! user.account_summary, :id, :user_id, :subscription_id, :policy_id, :total_meal_credits, :meal_credits_left
  end
end

if user.reservations
  json.reservations do 
    json.array!(user.reservations) do |reservation|
      json.id reservation.id
      json.meal reservation.meal
      json.pickupTime reservation.pickup_time
      json.shop reservation.menu.shop
    end
  end
end