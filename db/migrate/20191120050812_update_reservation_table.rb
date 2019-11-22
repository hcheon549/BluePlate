class UpdateReservationTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :reservations, :meal_id, :menu_id
  end
end
