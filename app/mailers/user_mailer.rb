class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #

  def notify_member(summary)
    @summary = summary
    mail to: 'eric@blueplattr.com', subject: "New Member!!"
  end

  def notify_signup(user)
    @user = user
    mail to: 'eric@blueplattr.com', subject: "Lead Created"
  end

  def welcome_email(user)
    @user = user
    mail to: @user.email, subject: "Welcome to BluePlattr!"
  end

  def password_reset(user)
    @user = user
    mail to: @user.email, subject: "Reset Password Instruction from BluePlattr"
  end
end
