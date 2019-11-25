json.lunch do
  @lunches.each do |lunch|
    json.set! lunch.id do
      json.extract! lunch, :id, :start, :end
    end
  end
end

json.dinner do
  @dinners.each do |dinner|
    json.set! dinner.id do
      json.extract! dinner, :id, :start, :end
    end
  end
end