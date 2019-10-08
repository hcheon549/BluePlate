@reservations.each do |res|
  json.set! res.id do
    json.extract! res, :id, :user_id, :meal_id, :date, :time
  end
end
