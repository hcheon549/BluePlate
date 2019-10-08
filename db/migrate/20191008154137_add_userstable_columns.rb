class AddUserstableColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fname, :string, null: false, default: 'Eric'
    add_column :users, :lname, :string, null: false, default: 'Cheon'
    add_column :users, :campus_id, :integer, null: false, foreign_key: true, default: 1
    add_column :users, :plan_id, :integer, foreign_key: true
  end
end
