class Plan < ApplicationRecord
  validates :name, :meals, :price, :plan_type, presence: true

  # belongs_to :subscription
  # attr_reader :duration
end
