class UpdateReservation < ActiveRecord::Migration[5.2]
  def change
    remove_column :reservations, :time
    remove_column :reservations, :date
    remove_column :reservations, :datetime
  end
end
