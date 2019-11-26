@reservations.each do |res|
  json.set! res.id do
    json.extract! res, :id, :user_id, :menu_id, :pickup_time_id, :pickup_status
  end
end
