class ChangeUsersMealColumn < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :meals_left, nil
    change_column_null :users, :meals_left, true
  end
end
