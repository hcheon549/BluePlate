@plans.each do |plan|
  json.set! plan.id do
    json.extract! plan, :id, :name, :type, :meals, :price, :duration, :description
  end
end
