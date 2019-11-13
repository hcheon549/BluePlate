class ChangeDefaultColumn < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :fname, nil
    change_column_default :users, :lname, nil
    change_column_null :users, :fname, true
    change_column_null :users, :lname, true
  end
end
