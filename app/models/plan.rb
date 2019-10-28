class Plan < ApplicationRecord
  validates :name, :meals, :description, :price, :duration, presence: true

  belongs_to :subscription

  attr_reader :duration
end
