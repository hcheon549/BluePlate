class CreateSubscriptionTable < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false
      t.integer :plan_id, null: false
      t.integer :meal_credit, null: false
      t.date :subscription_start, null: false
      t.date :subscription_end, null: false
    end
    add_index :subscriptions, [:user_id, :plan_id], unique: true
  end
end
