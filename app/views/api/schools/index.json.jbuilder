@schools.each do |school|
  json.set! school.id do
    json.extract! school, :id, :name, :latitude, :longitude
  end
end
