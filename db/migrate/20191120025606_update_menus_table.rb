class UpdateMenusTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :menus, :quantity, :quantity_available
    add_column :menus, :quantity_ordered, :integer, null: false, default: 0
  end
end
