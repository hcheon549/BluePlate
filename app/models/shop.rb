# == Schema Information
#
# Table name: shops
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  address    :string
#  latitude   :float            not null
#  longitude  :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Shop < ApplicationRecord
  validates :name, :latitude, :longitude, :school_id, presence: true

  has_many :meals
  has_many :favorites
  has_one :shop_order

  def self.in_bounds(bounds)
    self.where("latitude < ?", bounds["northEast"]["lat"])
      .where("latitude > ?", bounds["southWest"]["lat"])
      .where("longitude > ?", bounds["southWest"]["lng"])
      .where("longitude < ?", bounds["northEast"]["lng"])
  end
end
