class Subscription < ApplicationRecord
  validates :user_id, :plan_id, :meal_credit, :subscription_start, :subscription_end, presence: true

  belongs_to :user
  belongs_to :plan
end