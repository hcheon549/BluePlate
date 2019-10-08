class ChangeCitiesTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :cities, :schools
  end
end
