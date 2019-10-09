class AddMealsSchoolId < ActiveRecord::Migration[5.2]
  def change
    add_column :meals, :school_id, :integer, null: false, default: 1
  end
end
