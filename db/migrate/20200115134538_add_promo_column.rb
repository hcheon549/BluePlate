class AddPromoColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :promos, :total_redeemed, :integer, null: false, default: 0
  end
end
