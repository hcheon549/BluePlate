# == Schema Information
#
# Table name: meals
#
#  id                   :bigint(8)        not null, primary key
#  name                 :string           not null
#  description          :string           not null
#  price                :float            not null
#  image_url            :string           not null
#  shop_id              :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  total_number_ordered :integer          default(0), not null
#

require 'test_helper'

class MealTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
