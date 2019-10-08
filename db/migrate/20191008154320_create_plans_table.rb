class CreatePlansTable < ActiveRecord::Migration[5.2]
  def change
    create_table :plans do |t|
      t.string :name, null: false
      t.string :type
      t.integer :meals, null: false
      t.float :price, null: false

      t.timestamps null: false
    end
  end
end
