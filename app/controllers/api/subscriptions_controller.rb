class Api::SubscriptionsController < ApplicationController

  def create
    @subscription = Subscription.new(subscription_params)
    @subscription.user_id = current_user.id
    @subscription.meal_credit = @subscription.plan.meals
    @subscription.subscription_start = Date.today
    @subscription.subscription_end = Date.new(2020, 5, 13)

    if @subscription.save
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def update
    @subscription = Subscription.find(params[:id])

    if @subscription.update_attributes(plan_id: params[:subscription][:plan_id])
      @subscription.meal_credit = @subscription.plan.meals
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end

  end

  # def destroy
  #   @reservation = current_user.reservations.find(params[:id])
  #   @reservation.destroy
  #   current_user.update_attributes(meals_left: current_user.meals_left + 1)
  #   @user = current_user
  #   render :show
  # end

  private

  def subscription_params
    params.require(:subscription).permit(:plan_id)
  end

end
