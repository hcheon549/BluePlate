json.meals do
  @meals.each do |meal|
    json.set! meal.id do
      json.extract! meal, :id, :name, :description, :price, :image_url, :shop_id
    end
  end
end

json.shops do
  @shops.each do |shop|
    json.set! shop.id do
      json.extract! shop, :id, :name, :address, :latitude, :longitude, :school_id
      json.meals shop.meals do |meal|
        json.extract! meal, :id, :name, :description, :price, :image_url, :shop_id
      end
    end
  end
end