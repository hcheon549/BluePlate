json.reservation do
  json.extract! @reservation, :id, :user_id, :menu_id, :pickup_time_id, :pickup_status, :pickup_code
  
  json.user do
    json.extract! @reservation.user, :id, :email, :fname, :lname
  end

  json.menu do
    json.extract! @reservation.menu, :id, :meal_id, :offered_date, :lunch, :dinner, :lunch_quantity_available, :dinner_quantity_available, :quantity_ordered
  end

  json.pickupTime do
    json.extract! @reservation.pickup_time, :id, :pickup_type, :start, :end
  end

  json.meal do
    json.extract! @reservation.meal, :id, :name, :description, :price, :image_url, :shop_id, :total_number_ordered
  end

  json.shop do
    json.extract! @reservation.meal.shop, :id, :name, :address
  end
end

json.user @user, :id, :email, :fname, :lname, :school_id
