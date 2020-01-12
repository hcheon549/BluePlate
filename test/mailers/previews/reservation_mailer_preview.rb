# Preview all emails at http://localhost:3000/rails/mailers/reservation_mailer
class ReservationMailerPreview < ActionMailer::Preview
  # Preview all emails at http://localhost:3000/rails/mailers/reservation_mailer/order_confirmation
  def order_confirmation
    @user = User.find_by(email: "demo@gmail.com")
    @reservation = Reservation.first
    ReservationMailer.order_confirmation(@user, @reservation)
  end

  # Preview all emails at http://localhost:3000/rails/mailers/reservation_mailer/update_confirmation
  def update_confirmation
    @user = User.find_by(email: "demo@gmail.com")
    @reservation = Reservation.first
    ReservationMailer.update_confirmation(@user, @reservation)
  end

  # Preview all emails at http://localhost:3000/rails/mailers/reservation_mailer/cancel_confirmation
  def cancel_confirmation
    @user = User.find_by(email: "demo@gmail.com")
    @reservation = Reservation.first
    ReservationMailer.cancel_confirmation(@user, @reservation)
  end
end
