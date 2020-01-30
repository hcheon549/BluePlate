class AddShopsColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :shops, :show_menu, :boolean, default: true
  end
end
