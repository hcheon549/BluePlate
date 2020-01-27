class Api::SubscriptionsController < ApplicationController

  def create
    @subscription = Subscription.new(subscription_params)
    @subscription.user_id = current_user.id
    @subscription.meal_credit = @subscription.plan.meals

    start_date = Date.today
    renew_date = calculate_renew_date(start_date, @subscription.plan)

    @subscription.subscription_start = start_date
    @subscription.subscription_end = renew_date

    if @subscription.save
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def update
    @subscription = Subscription.find(params[:id])
    @plan = Plan.find(params[:subscription][:plan_id])
    @today = Date.today

    if @subscription.update_attributes(
        plan_id: params[:subscription][:plan_id],
        subscription_start: @today,
        subscription_end: calculate_renew_date(@today, @plan)
      )
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

  def calculate_renew_date(start_date, plan)
    case plan.plan_type
      when "semester"
        renew_date = Date.new(2020, 5, 20)
      when "4weeks"
        renew_date = start_date + 28
      when "2weeks"
        renew_date = start_date + 14
      when "1week"
        renew_date = start_date + 7
      when "test"
        renew_date = start_date + 1
      else
        renew_date = start_date + 28
    end

    renew_date
  end

end
