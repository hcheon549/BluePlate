class AddMenuUniqTable < ActiveRecord::Migration[5.2]
  def change
    add_index :menus, [:shop_id, :offered_date], unique: true
  end
end
