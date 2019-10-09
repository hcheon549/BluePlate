class RemoveDefaultvalueSchoolId < ActiveRecord::Migration[5.2]
  def change
    change_column_default :meals, :school_id, nil
  end
end
