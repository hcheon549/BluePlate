class DropPickuptime < ActiveRecord::Migration[5.2]
  def change
    drop_table :pickup_time
  end
end
