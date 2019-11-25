class AddColumnPickuptime < ActiveRecord::Migration[5.2]
  def change
    add_column :pickup_times, :end, :string
  end
end
