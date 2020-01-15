class Promo < ApplicationRecord
  validates :code, :description, :adjustment_type, :adjustment_value, :quantity, :total_redeemed, presence: true
end