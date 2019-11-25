class UpdateReservation < ActiveRecord::Migration[5.2]
  def change
    remove_column :reservations, :time
    remove_column :reservations, :date
    remove_column :reservations, :datetime
    add_column :reservations, :pickup_time_id, :integer, null: false
  end
end
