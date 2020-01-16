class Api::ChargesController < ApplicationController
  def create
    # secret_key
    Stripe.api_key = "sk_test_4qiK0iSd8XZDkOqzgx2Vkrc000LjZTEdJp"

    customer = Stripe::Customer.create({
      email: params[:chargeData][:stripeEmail],
      source: params[:chargeData][:stripeToken],
      name: params[:chargeData][:customerName]
    })

    charge = Stripe::Charge.create({
      customer: customer.id,
      amount: (params[:chargeData][:amount] * 100).to_i,
      description: params[:chargeData][:description],
      promo: params[:chargeData][:promo],
      currency: 'usd',
    })

    if charge
      render json: {message: 'Charge Successful', policyType: "member"}
    end

    rescue Stripe::CardError => e
      render json: {message: 'Invalid card information.'}, status: 500
  end
end