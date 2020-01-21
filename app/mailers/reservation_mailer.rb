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

  def send_order(shop, shop_order, pickup_time, reservations, meal)
    @shop = shop
    @pickup_time = pickup_time
    @reservations = reservations
    # @meal = meal
    @meal = meal
    @date = format_date(Date.today)
    mails_to_send = shop_order.emails.concat(["eric@blueplattr.com", "ben@blueplattr.com"])
    mail_subject = "[#{@date}] BluePlattr Order Summary"
    
    mails_to_send.each do | email |
      mail to: email, subject: mail_subject
    end
  end

  private
  def format_date(date)
    date.strftime("%m/%d/%Y")
  end
end
