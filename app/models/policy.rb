class Policy < ApplicationRecord
  validates :policy_id, :name, :description, :policy_type, presence: true

  # belongs_to :account_summary
  has_many :users, through: :account_summaries
end
