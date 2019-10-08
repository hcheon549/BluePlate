
json.res @reservation, :id, :user_id, :meal_id, :date, :time
json.user @user, :id, :email, :name, :meals_left, :preferred_city, :company_name, :image_url
