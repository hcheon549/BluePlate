class ChangeAccountSummaryColumns < ActiveRecord::Migration[5.2]
  def change
    rename_column :account_summaries, :account_id, :user_id
  end
end
