class RemoveUserMeals < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :meals_left
  end
end
