class ChangeMealsColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :meals, :total_number_ordered, :string, null: false, default: 0
    add_column :reservations, :pickup_status, :boolean, null: false, default: false
  end
end
