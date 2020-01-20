@shops.each do |shop|
  json.set! shop.id do
    json.extract! shop, :id, :address, :name, :latitude, :longitude, :school_id
  end
end
