class ChangeMealsDatatype < ActiveRecord::Migration[5.2]
  def change
    remove_column :meals, :total_number_ordered
  end
end
