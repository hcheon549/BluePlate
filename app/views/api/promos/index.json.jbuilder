@promos.each do |promo|
  json.set! promo.id do
    json.extract! promo, :id, :code, :description, :adjustment_type, :adjustment_value, :quantity, :active, :total_redeemed
  end
end
