class AddPickuptime < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :pickup_time_id, :integer
  end
end
