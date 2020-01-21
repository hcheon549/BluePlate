class ShopOrder < ApplicationRecord
  validates :shop_id, :emails, presence: true
  belongs_to :shop
end