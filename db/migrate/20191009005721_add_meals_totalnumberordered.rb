class AddMealsTotalnumberordered < ActiveRecord::Migration[5.2]
  def change
    add_column :meals, :total_number_ordered, :integer, null: false, default: 0
  end
end
