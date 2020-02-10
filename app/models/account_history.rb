class AccountHistory < ApplicationRecord
  validates :user_id, :date, :action_type, presence: true

  belongs_to :user
end