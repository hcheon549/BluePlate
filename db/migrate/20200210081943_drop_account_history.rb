class DropAccountHistory < ActiveRecord::Migration[5.2]
  def change
    drop_table :account_history_tables
  end
end
