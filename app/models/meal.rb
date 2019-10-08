# == Schema Information
#
# Table name: meals
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  description :string           not null
#  image_url   :string           not null
#  shop_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Meal < ApplicationRecord
  validates :name, :description, :image_url, presence: true

  belongs_to :shop
  has_one :school, through: :shop

  has_many :reservations
end
