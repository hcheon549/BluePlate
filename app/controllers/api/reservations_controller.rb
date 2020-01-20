class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.includes(:menu, :pickup_time, :meal, :user, meal: :shop).where(user_id: current_user.id)
    today = Date.today
    if Time.now.hour > 21
      today += 1
    end

    if @reservations
      @today_reservations = @reservations.select do | reservation |
        reservation.menu.offered_date == today
      end
      render :index
    else
      render json: ["No reservations found"], status: 404
    end
  end

  def show

  end

  def create
    @user = current_user
    @user_summary = @user.account_summary

    if @user_summary.meal_credits_left < 1
      render json: ["No Meals left!"], status: 422
    end

    @reservation = Reservation.new(
      user_id: params[:reservation][:user_id],
      menu_id: params[:reservation][:menu_id],
      pickup_time_id: params[:reservation][:pickup_time_id]
    )

    @reservation.pickup_code = generate_pickup_code

    if @reservation.save
      adjust_attributes('create', @user, @reservation)
      ReservationMailer.order_confirmation(@user, @reservation).deliver_later(wait: 5.second)
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end
  

  def update
    @reservation = current_user.reservations.find(params[:id])

    if @reservation.update_attributes(
      user_id: params[:reservation][:user_id],
      menu_id: params[:reservation][:menu_id],
      pickup_time_id: params[:reservation][:pickup_time_id],
      )
      @user = current_user
      ReservationMailer.update_confirmation(@user, @reservation).deliver_later(wait: 5.second)
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end

  end

  def destroy
    @user = current_user
    @reservation = @user.reservations.find(params[:id])

    if @reservation.destroy
      ReservationMailer.cancel_confirmation(@user, @reservation).deliver_now
      adjust_attributes('destroy', @user, @reservation)
      render :show
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(:user_id, :menu_id, :pickup_time_id)
  end

  def adjust_attributes(type, user, reservation)
    account_summary = AccountSummary.find(user.account_summary.id)
    menu = Menu.find(reservation.menu.id)
    meal = Meal.find(reservation.meal.id)
    now = Time.now

    if type == 'create'
      account_summary.decrement!(:meal_credits_left)
      if reservation.pickup_time.pickup_type == 0
        menu.decrement!(:lunch_quantity_available)
      else
        menu.decrement!(:dinner_quantity_available)
      end
      menu.increment!(:quantity_ordered)
      meal.increment!(:total_number_ordered)
    elsif type == 'destroy'
      if ((reservation.pickup_time.pickup_type == 0 && (now.hour < 10)) || (reservation.pickup_time.pickup_type == 1 && (now.hour < 16)))
        account_summary.increment!(:meal_credits_left)
        if reservation.pickup_time.pickup_type == 0
          menu.increment!(:lunch_quantity_available)
        else
          menu.increment!(:dinner_quantity_available)
        end
          menu.decrement!(:quantity_ordered)
        meal.increment!(:total_number_ordered)
      end
    end

  end

  def generate_pickup_code
    other_codes = Reservation.where(menu_id: params[:reservation][:menu_id]).map(&:pickup_code)
    new_code = rand(1000...9999)

    while other_codes.include?(new_code)
      new_code = rand(1000...9999)
    end

    return new_code
  end
end