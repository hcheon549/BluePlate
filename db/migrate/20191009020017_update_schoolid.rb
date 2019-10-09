class UpdateSchoolid < ActiveRecord::Migration[5.2]
  def change
    remove_column :meals, :school_id
    add_column :shops, :school_id, :integer, null: false
  end
end
