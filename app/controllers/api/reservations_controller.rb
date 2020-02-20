class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.includes(:menu, :pickup_time, :meal, :user, meal: :shop).where(user_id: current_user.id)
    today = Date.today

    if Time.now.hour >= 21
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

  def get_reservations
    today = Date.today
    if Time.now.hour > 21
      today += 1
    end
    @reservations = Reservation.includes(:menu, :pickup_time, :meal, :user, meal: :shop).joins(:menu).where(menus: { offered_date: today })
    
    if @reservations
      render :reserve
    else
      render json: ["No reservations found"], status: 404    
    end
  end

  def create
    @user = current_user
    @user_summary = @user.account_summary
    @pickup_time_id = params[:reservation][:pickup_time_id]
    @menu_id = params[:reservation][:menu_id]

    if @user_summary.meal_credits_left < 1
      return render json: { message: "No meals left" }, status: 403
    # elsif !can_reserve(@pickup_time_id, @menu_id)
    #   return render json: { message: "Cannot make a reservation" }, status: 403
    end

    @reservation = Reservation.new(
      user_id: params[:reservation][:user_id],
      menu_id: params[:reservation][:menu_id],
      pickup_time_id: params[:reservation][:pickup_time_id]
    )

    @reservation.pickup_code = generate_pickup_code

    if @reservation.save
      adjust_attributes('create', @user, @reservation)
      ReservationMailer.order_confirmation(@user, @reservation).deliver_later(wait: 3.second)
      ReservationMailer.notify_admin(@user, @reservation, 'New Reservation Created').deliver_later(wait: 2.second)
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end
  

  def update
    @old_reservation = current_user.reservations.find(params[:id])
    @reservation = current_user.reservations.find(params[:id])
    @pickup_time_id = params[:reservation][:pickup_time_id]
    @menu_id = params[:reservation][:menu_id]

    # if !can_reserve(@pickup_time_id, @menu_id)
    #   return render json: ["Cannot Update the Reservation"], status: 403
    # end

    if @reservation.update_attributes(
      user_id: params[:reservation][:user_id],
      menu_id: params[:reservation][:menu_id],
      pickup_time_id: params[:reservation][:pickup_time_id],
      )
      @user = current_user
      adjust_attributes('update', @user, @reservation, @old_reservation)
      ReservationMailer.update_confirmation(@user, @reservation).deliver_later(wait: 3.second)
      ReservationMailer.notify_admin(@user, @reservation, 'Reservation Updated').deliver_later(wait: 2.second)
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = current_user
    @reservation = @user.reservations.find(params[:id])

    if @reservation.destroy
      adjust_attributes('destroy', @user, @reservation)
      ReservationMailer.cancel_confirmation(@user, @reservation).deliver_now
      ReservationMailer.notify_admin(@user, @reservation, 'Reservation Canceled').deliver_now
      render :show
    end
  end

  def send_order
    @shop = Shop.includes(:shop_order).find(params[:id])
    @shop_order = @shop.shop_order
    @pickup_time = params[:pickupTime]
    @order_type = params[:orderType] == 0 ? 'Lunch' : 'Dinner'
    @reservations = params[:reservations]
    @meal = params[:meal]
    @emails = @shop_order.emails.push("support@blueplattr.com")

    @emails.each do | email |
    # ["support@blueplattr.com"].each do | email |
      ReservationMailer.send_order(@shop, email, @pickup_time, @reservations, @meal, @order_type).deliver_now
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(:user_id, :menu_id, :pickup_time_id)
  end

  def can_reserve(pickup_time_id, menu_id)
    reservation_type = PickupTime.find(pickup_time_id).pickup_type

    if reservation_type == 0
      return Time.now.hour < 10 && is_for_today(menu_id)
    elsif reservation_type == 1
      return Time.now.hour < 16 && is_for_today(menu_id)
    else
      return false
    end
  end

  def adjust_attributes(type, user, reservation, prev_reservation=nil)
    account_summary = AccountSummary.find(user.account_summary.id)
    menu = Menu.find(reservation.menu.id)
    is_for_today = is_for_today(menu.id)
    meal_type = reservation.pickup_time.pickup_type

    unless prev_reservation.nil?
      prev_meal = Meal.find(prev_reservation.meal.id)
      prev_menu = prev_reservation.menu
    end
    meal = Meal.find(reservation.meal.id)
    now = Time.now

    ## UPDATE ATTRIBUTES FOR NEW RESERVATIONS
    if type == 'create'
      account_summary.decrement!(:meal_credits_left)
      meal_type == 0 ? menu.decrement!(:lunch_quantity_available) : menu.decrement!(:dinner_quantity_available)
      menu.increment!(:quantity_ordered)
      meal.increment!(:total_number_ordered)

    ## UPDATE ATTRIBUTES FOR EXISTING RESERVATIONS
    elsif type == 'update'
      if meal_type == 0
        menu.decrement!(:lunch_quantity_available)
        prev_menu.increment!(:lunch_quantity_available)
      else
        menu.decrement!(:dinner_quantity_available)
        prev_menu.increment!(:dinner_quantity_available)
      end
      menu.increment!(:quantity_ordered)
      prev_menu.decrement!(:quantity_ordered)
      meal.increment!(:total_number_ordered)
      prev_meal.decrement!(:total_number_ordered)
    
    ## UPDATE ATTRIBUTES FOR DELETING RESERVATIONS
    elsif type == 'destroy'
      if ((meal_type == 0 && now.hour < 10 ) || (meal_type == 1 && now.hour < 16 )) && is_for_today
        account_summary.increment!(:meal_credits_left)
        meal_type == 0 ? menu.increment!(:lunch_quantity_available) : menu.increment!(:dinner_quantity_available)
        menu.decrement!(:quantity_ordered)
        meal.decrement!(:total_number_ordered)
      end
    end
  end

  def is_for_today(menu_id)
    Menu.find(menu_id).offered_date == Date.today
  end

  def generate_pickup_code
    other_codes = Reservation.where(menu_id: params[:reservation][:menu_id]).map(&:pickup_code)
    new_code = rand(1000...9999)

    while other_codes.include?(new_code)
      new_code = rand(1000...9999)
    end

    new_code
  end
end