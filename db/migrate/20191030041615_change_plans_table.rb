class ChangePlansTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :plans, :description
    remove_column :plans, :duration
  end
end
