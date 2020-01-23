class ReservationMailer < ApplicationMailer
  def order_confirmation(user, reservation)
    @user = user
    @reservation = reservation
    @date = format_date(@reservation.menu.offered_date)
    mail_subject = "BluePlattr - #{@reservation.pickup_time.pickup_type == 0 ? 'Lunch' : 'Dinner'} Reserved for #{@date}"
    mail to: @user.email, subject: mail_subject
  end

  def update_confirmation(user, reservation)
    @user = user
    @reservation = reservation
    @date = format_date(@reservation.menu.offered_date)
    mail_subject = "BluePlattr - Update on Your #{@reservation.pickup_time.pickup_type == 0 ? 'Lunch' : 'Dinner'} Reserved for #{@date}"
    mail to: @user.email, subject: mail_subject
  end

  def cancel_confirmation(user, reservation)
    @user = user
    @reservation = reservation
    @date = format_date(@reservation.menu.offered_date)
    mail_subject = "BluePlattr - Cancellation of Your #{@reservation.pickup_time.pickup_type == 0 ? 'Lunch' : 'Dinner'} Reserved for #{@date}"
    mail to: @user.email, subject: mail_subject
  end

  def send_order(shop, email, pickup_time, reservations, meal, order_type)
    @shop = shop
    @pickup_time = pickup_time
    @reservations = reservations
    @meal = meal
    @order_type = order_type
    
    @date = format_vendor_order_date(Date.today)

    mail_subject = "[#{@date}] #{@shop.name} #{@order_type} Order Summary"
    mail to: email, subject: mail_subject
  end

  private
  def format_date(date)
    date.strftime("%m/%d/%Y")
  end

  def format_vendor_order_date(date)
    date.strftime("%B %d")
  end
end
