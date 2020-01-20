class Api::ShopsController < ApplicationController
  def index
    @shops = Shop.all

    if @shops
      render :index
    else
      render json: ["No shops found"], status: 404
    end
  end
end
