class Api::PasswordResetsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user
      user.send_password_reset
      render json: { message: 'Email sent!' }, status: 200
    end
  end

  def edit
    @user = User.find_by(password_reset_token: params[:id])
    if @user
      redirect_to("/reset-password?#{@user.password_reset_token}")
    end
  end

  def update
    @user = User.find_by(password_reset_token: params[:id])

    if @user.password_reset_sent_at < 2.hours.ago
      render json: { message: "Password reset has expired." }
    elsif @user.update_attributes(password: params[:password])
      render json: { message: "Password has been reset!" }
    else
      render json: { message: @user.errors.full_messages }, status: 422
    end
  end
end
