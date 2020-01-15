class Api::PromosController < ApplicationController
  def index
    @promos = Promo.all

    if @promos
      render :index
    else
      render json: ["No promos found"], status: 404
    end
  end

  def show
    @promo = Promo.find_by(code: params[:code])

    if @promo
      render :show
    else
      render json: ["No promo found"], status: 404
    end
  end

  private
end
