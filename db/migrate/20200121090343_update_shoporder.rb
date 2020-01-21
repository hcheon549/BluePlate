class UpdateShoporder < ActiveRecord::Migration[5.2]
  def change
    change_column :shop_orders, :fax, :string
  end
end
