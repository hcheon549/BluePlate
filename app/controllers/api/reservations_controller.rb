class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.includes(:menu).where(user_id: current_user.id)

    if @reservations
      today = Date.today
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
    user_summary = @user.account_summary

    if user_summary.meal_credits_left < 1
      render json: ["No Meals left!"], status: 422
    end

    @reservation = Reservation.new(
      user_id: params[:reservation][:user_id],
      menu_id: params[:reservation][:menu_id],
      pickup_time_id: params[:reservation][:pickup_time_id]
    )

    if @reservation.save
      # menu = @reservation.menu
      # meal = @reservation.meal

      # print "before update: quantity_available"
      # puts menu.quantity_available
      # print "before update: meal_credits_left"
      # puts user_summary.meal_credits_left
      # print "before update: total_number_ordered"
      # puts meal.total_number_ordered

      # adjust_attributes(user_summary, menu, meal)

      # user_summary.update_attributes(
      #   meal_credits_left: user_summary.meal_credits_left - 1
      # )
      
      # menu.update_attributes(
      #   quantity_available: menu.quantity_available -1,
      #   quantity_ordered: menu.quantity_ordered + 1
      # )

      # meal.update_attributes(
      #   total_number_ordered: meal.total_number_ordered + 1
      # )
      
      # print "after update: quantity_available"
      # puts menu.quantity_available
      # print "after update: meal_credits_left"
      # puts user_summary.meal_credits_left
      # print "after update: total_number_ordered"
      # puts meal.total_number_ordered

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
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end

  end

  def destroy
    @reservation = current_user.reservations.find(params[:id])
    @reservation.destroy
    current_user.update_attributes(meals_left: current_user.meals_left + 1)
    @user = current_user
    render :show
  end

  private

  def reservation_params
    params.require(:reservation).permit(:user_id, :menu_id, :pickup_time_id)
  end

  def adjust_attributes(user_summary, menu, meal)
    user_summary.update_attributes(
      meal_credits_left: user_summary.meal_credits_left - 1
    )
    # menu.update_attributes(
    #   quantity_available: menu.quantity_available -1,
    #   quantity_ordered: menu.quantity_ordered + 1
    # )
    # meal.update_attributes(
    #   total_number_ordered: meal.total_number_ordered + 1
    # )
  end

end