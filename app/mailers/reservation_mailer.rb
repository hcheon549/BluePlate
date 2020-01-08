class ReservationMailer < ApplicationMailer
  def order_confirmation(reservation)
    @reservation = reservation
    mail to: 'eric@blueplattr.com', subject: "Order Confirmation"
  end

  def update_confirmation(reservation)
    @reservation = reservation
    mail to: 'eric@blueplattr.com', subject: "Update Order Confirmation"
  end

  def cancel_confirmation(reservation)
    @reservation = reservation
    debugger
    mail to: 'eric@blueplattr.com', subject: "Order Cancellation Confirmation"
  end
end
