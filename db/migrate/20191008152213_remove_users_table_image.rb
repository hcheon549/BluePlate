class RemoveUsersTableImage < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :image_url
    remove_column :users, :company_name
    remove_column :users, :membership_type
  end
end
