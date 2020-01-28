class Api::PromosController < ApplicationController
  def index
    @promos = Promo.all

    if @promos
      render :index
    else
      render json: ["No promos found"], status: 404
    end
  end

  def match
    @promo = Promo.find_by(code: params[:code])

    if @promo
      render :show
    else
      render json: ["Invalid Code"], status: 404
    end
  end

  def apply
    @promo = Promo.find(params[:id])
    new_quantity = @promo.quantity - 1
    redeemed_added = @promo.total_redeemed + 1

    if @promo.update_attributes(quantity: new_quantity, total_redeemed: redeemed_added)
      render :show
    else
      render json: @promo.errors.full_messages, status: 422
    end
  end
end
