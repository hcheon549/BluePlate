class PickupTime < ApplicationRecord
  validates :pickup_type, :start, :end, presence: true

  # belongs_to :reservation
end