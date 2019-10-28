class ChangePlansColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :plans, :type, :plan_type
  end
end
