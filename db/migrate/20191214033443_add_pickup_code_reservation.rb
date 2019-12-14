class AddPickupCodeReservation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :pickup_code, :integer, null: false, default: 1111
  end
end
