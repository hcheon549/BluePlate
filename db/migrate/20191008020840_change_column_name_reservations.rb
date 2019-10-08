class ChangeColumnNameReservations < ActiveRecord::Migration[5.2]
  def change
    rename_column :reservations, :treat_id, :meal_id
  end
end
