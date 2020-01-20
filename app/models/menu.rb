class Menu < ApplicationRecord
  validates :meal_id, :offered_date, :lunch_quantity_available, :dinner_quantity_available, :quantity_ordered, presence: true
  validates_inclusion_of :lunch, in: [true, false]
  validates_inclusion_of :dinner, in: [true, false]

  belongs_to :meal
  has_many :reservations
  has_one :shop, through: :meal
end
