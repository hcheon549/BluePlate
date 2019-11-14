class AddTimestamp < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :account_summaries
    add_timestamps :subscriptions
  end
end
