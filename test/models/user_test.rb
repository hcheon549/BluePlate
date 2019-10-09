# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  meals_left      :integer          default(20), not null
#  enrolled_school :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  fname           :string           default("Eric"), not null
#  lname           :string           default("Cheon"), not null
#  school_id       :integer          default(1), not null
#  plan_id         :integer
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
