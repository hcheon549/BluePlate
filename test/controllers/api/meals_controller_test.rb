require 'test_helper'

class Api::MealsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_meals_index_url
    assert_response :success
  end

  test "should get search" do
    get api_meals_search_url
    assert_response :success
  end

end
