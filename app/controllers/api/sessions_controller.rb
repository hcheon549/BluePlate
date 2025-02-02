class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ["Invalid credentials"], status: 422
    end
  end

  def user
    @user = current_user
    
    if @user
      render 'api/users/show'
    else
      render json: {}
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}
    else
      render json: ["No current user"], status: 404
    end
  end
end
