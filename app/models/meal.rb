# == Schema Information
#
# Table name: meals
#
#  id                   :bigint(8)        not null, primary key
#  name                 :string           not null
#  description          :string           not null
#  price                :float            not null
#  image_url            :string           not null
#  shop_id              :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  total_number_ordered :integer          default(0), not null
#

class Meal < ApplicationRecord
  validates :name, :description, :price, :image_url, presence: true

  belongs_to :shop
  has_one :school, through: :shop
  has_many :menu
  has_many :reservations
end
