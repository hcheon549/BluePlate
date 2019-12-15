class LeadMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.lead_mailer.new_lead.subject
  #
  def new_lead(lead)
    @lead = lead
    mail to: "eric@blueplattr.com", subject: "Lead Generated"
  end
end
