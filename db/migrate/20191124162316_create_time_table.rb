class CreateTimeTable < ActiveRecord::Migration[5.2]
  def change
    create_table :pickup_time do |t|
      t.integer :pickup_type, null: false
      t.time :start, null: false
    end
  end
end
