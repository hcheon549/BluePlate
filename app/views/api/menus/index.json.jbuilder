
json.menu do
  @menus.each do |menu|
    json.set! menu.id do
      json.extract! menu, :id, :offered_date, :lunch, :dinner, :quantity_available, :quantity_ordered
      json.extract! menu.meal, :name, :description, :price, :image_url
      json.set! menu.meal.shop_id do
        json.extract! menu.meal.shop, :name, :address
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
