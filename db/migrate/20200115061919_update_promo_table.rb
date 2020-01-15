class UpdatePromoTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :promos, :active, true
  end
end
