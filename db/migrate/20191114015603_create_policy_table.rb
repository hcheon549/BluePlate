class CreatePolicyTable < ActiveRecord::Migration[5.2]
  def change
    create_table :policies do |t|
      t.integer :policy_id, null: false
      t.string :name, null: false
      t.string :description, null: false
      t.string :type, null: false

      t.timestamps
    end
  end
end
