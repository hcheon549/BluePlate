@plans.each do |plan|
  json.set! plan.id do
    json.extract! plan, :id, :name, :plan_type, :meals, :price
  end
end
