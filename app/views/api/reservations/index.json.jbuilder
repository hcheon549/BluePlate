json.all_reservations do 
  @reservations.each do |res|
    json.set! res.id do
      json.extract! res, :id, :user_id, :menu_id, :pickup_time_id, :pickup_status, :pickup_code
        
      json.user do
        json.extract! res.user, :id, :email, :fname, :lname
      end

      json.menu do
        json.extract! res.menu, :id, :meal_id, :offered_date, :lunch, :dinner, :quantity_available, :quantity_ordered
      end

      json.pickupTime do
        json.extract! res.pickup_time, :id, :pickup_type, :start, :end
      end

      json.meal do
        json.extract! res.meal, :id, :name, :description, :price, :image_url, :shop_id, :total_number_ordered
      end

      json.shop do
        json.extract! res.meal.shop, :id, :name, :address
      end
    end
  end
end

json.today_reservations do
  @today_reservations.each do | res |
    json.set! res.id do
      json.extract! res, :id, :user_id, :menu_id, :pickup_time_id, :pickup_status, :pickup_code
        
      json.user do
        json.extract! res.user, :id, :email, :fname, :lname
      end

      json.menu do
        json.extract! res.menu, :id, :meal_id, :offered_date, :lunch, :dinner, :quantity_available, :quantity_ordered
      end

      json.pickupTime do
        json.extract! res.pickup_time, :id, :pickup_type, :start, :end
      end

      json.meal do
        json.extract! res.meal, :id, :name, :description, :price, :image_url, :shop_id, :total_number_ordered
      end

      json.shop do
        json.extract! res.meal.shop, :id, :name, :address
      end
    end

  end
end