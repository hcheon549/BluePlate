# == Schema Information
#
# Table name: schools
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  latitude   :float            not null
#  longitude  :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class School < ApplicationRecord
  validates :name, :latitude, :longitude, presence: true

  has_many :shops
  has_many :meals, through: :shops
end
