class AccountHistory < ApplicationRecord
  validates :account_id, :date, :action_type, presence: true

  belongs_to :user
end