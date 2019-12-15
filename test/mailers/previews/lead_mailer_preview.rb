# Preview all emails at http://localhost:3000/rails/mailers/lead_mailer
class LeadMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/lead_mailer/new_lead
  def new_lead
    lead = Lead.last
    LeadMailer.new_lead(lead)
  end

end
