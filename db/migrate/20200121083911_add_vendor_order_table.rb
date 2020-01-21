class AddVendorOrderTable < ActiveRecord::Migration[5.2]
  def change
    create_table :shop_orders do |t|
      t.integer :shop_id, null: false
      t.text :emails, array: true, default: []
      t.integer :fax, default: :null

      t.timestamps
    end
    add_index :shop_orders, :shop_id
  end
end