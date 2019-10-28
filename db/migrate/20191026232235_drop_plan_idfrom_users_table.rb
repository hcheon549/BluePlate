class DropPlanIdfromUsersTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :plan_id, :integer
    add_column :plans, :description, :string
  end
end
