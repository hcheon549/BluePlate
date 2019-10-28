class AddDurationToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :duration, :date, null: false
  end
end
