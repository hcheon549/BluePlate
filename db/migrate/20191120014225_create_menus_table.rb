class CreateMenusTable < ActiveRecord::Migration[5.2]
  def change
    create_table :menus do |t|
      t.integer :meal_id, null: false
      t.date :offered_date, null: false
      t.boolean :lunch, default: true
      t.boolean :dinner, default: true
      t.integer :quantity, null: false, default: 50

      t.timestamps
    end
  end
end
