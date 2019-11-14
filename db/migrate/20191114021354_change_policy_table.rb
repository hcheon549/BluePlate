class ChangePolicyTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :policies, :type, :policy_type
  end
end
