# == Schema Information
#
# Table name: reservations
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  menu_id       :integer          not null
#  date          :date             not null
#  time          :time             not null
#  datetime      :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  pickup_status :boolean          default(FALSE), not null
#

class Reservation < ApplicationRecord
  validates :user_id, :menu_id, :pickup_time_id, presence: true

  belongs_to :user
  belongs_to :menu
  belongs_to :pickup_time
end
