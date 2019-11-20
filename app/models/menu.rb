class Menu < ApplicationRecord
  validates :meal_id, :offered_date, :lunch, :dinner, :quantity_available, :quantity_ordered, presence: true

  belongs_to :meal
  has_many :reservations
end
