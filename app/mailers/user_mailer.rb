class UserMailer < ApplicationMailer
  def notify_member(summary)
    @summary = summary
    mail to: 'eric@blueplattr.com', subject: "New Member!!"
  end

  def notify_signup(summary)
    @user = summary.user
    mail to: 'eric@blueplattr.com', subject: "Account Created"
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
