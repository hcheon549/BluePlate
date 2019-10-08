class ChangeTreatsToMeal < ActiveRecord::Migration[5.2]
  def change
    rename_table :treats, :meals
  end
end
