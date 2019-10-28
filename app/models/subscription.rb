class Subscription < ApplicationRecord
  validates :user_id, :plan_id, :meal_credit, :subscription_start, :subscription_end, presence: true

  belongs_to :user
  belongs_to :plan

  def subscription_end=(subscription_end)
    @duration = Plan.duration
    self.subscription_end = Subscription.subscription_start + duration
  end
end
