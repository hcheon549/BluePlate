class CreateAccountHistoryTable < ActiveRecord::Migration[5.2]
  def change
    create_table :account_history do |t|
      t.integer :account_id, null: false
      t.datetime :date, null: false
      t.string :action_type, null: false
      t.integer :action_data
      t.integer :resource_id
      t.text :memo
      
      t.timestamps
    end
    end
  end
end
