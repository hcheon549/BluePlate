class CreatePromoTable < ActiveRecord::Migration[5.2]
  def change
    create_table :promos do |t|
      t.string :code, null: false
      t.string :description, null: false
      t.string :adjustment_type, null: false
      t.integer :adjustment_value, null: false
      t.integer :quantity, null: false, default: 5000
      t.boolean :active, null: false

      t.timestamps
    end

    add_index :promos, :code
  end
end
