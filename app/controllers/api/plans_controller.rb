class Api::PlansController < ApplicationController
  def index
    @plans = Plan.all

    if @plans
      render :index
    else
      render json: ["No Plans Found"], status: 404
    end
  end
end