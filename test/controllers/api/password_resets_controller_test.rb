require 'test_helper'

class Api::PasswordResetsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get password_resets_new_url
    assert_response :success
  end

end
