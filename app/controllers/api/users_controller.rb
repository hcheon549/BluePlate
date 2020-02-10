class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @existing_user = User.find_by(email: params[:user][:email])
    
    if !@existing_user.nil?
      member_id = Policy.find_by(policy_type: "Member").policy_id
      is_member = AccountSummary.find_by(user_id: @existing_user.id).policy.policy_id == member_id
    end

    if @user.save && @existing_user.nil?
      login(@user)
      render :show
    elsif !@existing_user.nil? && !is_member
      render json: { existingId: @existing_user.id }
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])

    if @user
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes(user_params)
      debugger
      if !logged_in?
        login(@user)
      end
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :school_id, :updated_at)
  end
end
