class RenameUsersCampusid < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :campus_id, :school_id
  end
end
