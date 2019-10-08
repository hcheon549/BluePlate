class ChangeUsersTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :meals_left, :meals_left
    add_column :users, :membership_type, :string
  end
end
