class Api::ChargesController < ApplicationController
  def create
    # secret_key
    Stripe.api_key = "sk_live_s0bZte2dqIShRIIkcawJQIGN00jf9IWLEN"

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

    if charge
      render json: {message: 'Charge Successful', policyType: "member"}
    end

    rescue Stripe::CardError => e
      render json: {message: 'Invalid card information.'}, status: 500
  end
end