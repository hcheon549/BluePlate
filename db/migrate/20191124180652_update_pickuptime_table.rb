class UpdatePickuptimeTable < ActiveRecord::Migration[5.2]
  def change
    change_column :pickup_times, :start, :string
  end
end
