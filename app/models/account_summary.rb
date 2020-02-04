class AccountSummary < ApplicationRecord
  validates :user_id, :policy_id, presence: true

  belongs_to :user
  belongs_to :subscription
  belongs_to :policy
end