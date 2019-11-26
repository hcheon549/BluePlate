class NullfalseReservation < ActiveRecord::Migration[5.2]
  def change
    change_column_null :reservations, :pickup_time_id, false
  end
end
