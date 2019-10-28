class Plan < ApplicationRecord
  validates :name, :meals, :description, :price, :duration, :plan_type, presence: true

  # belongs_to :subscription
  # attr_reader :duration
end
