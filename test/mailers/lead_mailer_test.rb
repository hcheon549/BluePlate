require 'test_helper'

class LeadMailerTest < ActionMailer::TestCase
  test "new_lead" do
    mail = LeadMailer.new_lead
    assert_equal "New lead", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
