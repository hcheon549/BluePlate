class CreateAccountSummaryTable < ActiveRecord::Migration[5.2]
  def change
    create_table :account_summaries do |t|
      t.integer :account_id, null: false
      t.integer :subscription_id, null: false
      t.integer :policy_id, null: false
      t.integer :total_meal_credits, default: :null
      t.integer :meal_credits_left, default: :null

      t.timestamp
    end
  end
end
