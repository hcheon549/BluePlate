
json.menus do
  @menus.each do |menu|
    json.set! menu.id do
      json.extract! menu, :id, :offered_date, :lunch, :dinner, :quantity_available, :quantity_ordered
      # remove this line later
      json.extract! menu.meal, :name, :description, :price, :image_url
      
      json.meal do 
        json.extract! menu.meal, :id, :name, :description, :price, :image_url
      end

      json.shop do
        json.extract! menu.meal.shop, :id, :name, :address
      end
    end
  end
end

json.shops do
  @shops.each do |shop|
    json.set! shop.id do
      json.extract! shop, :id, :name, :address, :latitude, :longitude, :school_id
    end
  end
end
