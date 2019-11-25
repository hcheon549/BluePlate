class CreatePickuptimeTable < ActiveRecord::Migration[5.2]
  def change
    create_table :pickup_times do |t|
      t.integer :pickup_type, null: false
      t.time :start, null: false
    end
  end
end
