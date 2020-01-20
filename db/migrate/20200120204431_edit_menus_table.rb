class EditMenusTable < ActiveRecord::Migration[5.2]
  def change
    add_column :menus, :dinner_quantity_available, :integer, null: false
    rename_column :menus, :quantity_available, :lunch_quantity_available
  end
end
