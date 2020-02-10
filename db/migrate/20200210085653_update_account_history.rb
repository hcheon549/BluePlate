class UpdateAccountHistory < ActiveRecord::Migration[5.2]
  def change
    rename_column :account_histories, :account_id, :user_id
  end
end
