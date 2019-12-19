class Api::PasswordResetsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user
      debugger
      user.send_password_reset
      render json: ["Email sent"], status: 200
    end
  end

  def edit
    @user = User.find_by_password_reset_token!(params[:id])
  end

  def update
    @user = User.find_by_password_reset_token!(params[:id])

    if @user.password_reset_sent_at < 2.hours.ago
      render json: ["Password reset has expired."]
    elsif @user.update_attributes(params[:user])
      render json: ["Password has been reset!"]
    else
      render :edit
    end
  end
end
