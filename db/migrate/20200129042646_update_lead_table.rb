class UpdateLeadTable < ActiveRecord::Migration[5.2]
  def change
    add_column :leads, :time_now, :datetime
    add_column :leads, :time_current, :datetime
    add_column :leads, :time_utc, :datetime
    add_column :leads, :time_utc_offset, :datetime
  end
end
