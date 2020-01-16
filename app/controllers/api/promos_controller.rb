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
end
