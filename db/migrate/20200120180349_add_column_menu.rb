class AddColumnMenu < ActiveRecord::Migration[5.2]
  def change
    add_column :menus, :shop_id, :integer, null: false
  end
end
