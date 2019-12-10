class CreateLeadTable < ActiveRecord::Migration[5.2]
  def change
    create_table :leads do |t|
      t.string :email, null: false
      t.string :campus
      t.text :wishlist
      
      t.timestamps
    end
  end
end
