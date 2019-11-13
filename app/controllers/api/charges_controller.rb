class Api::ChargesController < ApplicationController
  def create
    Stripe.api_key = STRIPE_SECRET_KEY

    customer = Stripe::Customer.create({
      email: params[:chargeData][:stripeEmail],
      source: params[:chargeData][:stripeToken],
      name: params[:chargeData][:customerName]
    })
  
    charge = Stripe::Charge.create({
      customer: customer.id,
      amount: (params[:chargeData][:amount] * 100).to_i,
      description: params[:chargeData][:description],
      currency: 'usd',
    })
  
    rescue Stripe::CardError => e
      render json: {message: 'Invalid card information.'}, status: 500
  end
end