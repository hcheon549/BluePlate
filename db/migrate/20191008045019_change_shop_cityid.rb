class ChangeShopCityid < ActiveRecord::Migration[5.2]
  def change
    rename_column :shops, :city_id, :school_id
    rename_column :users, :preferred_city, :enrolled_school
  end
end
