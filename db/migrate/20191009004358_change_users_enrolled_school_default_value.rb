class ChangeUsersEnrolledSchoolDefaultValue < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :enrolled_school, nil
  end
end
