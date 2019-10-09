class DropSchoolIdShop < ActiveRecord::Migration[5.2]
  def change
    remove_column :shops, :school_id
  end
end
