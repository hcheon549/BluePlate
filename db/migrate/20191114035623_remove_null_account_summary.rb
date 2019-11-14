class RemoveNullAccountSummary < ActiveRecord::Migration[5.2]
  def change
    change_column_null :account_summaries, :subscription_id, true
  end
end
