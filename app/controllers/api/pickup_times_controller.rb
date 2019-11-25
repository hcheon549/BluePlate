class Api::PickupTimesController < ApplicationController
  def index
    @lunches = PickupTime.where(pickup_type: 0)
    @dinners = PickupTime.where(pickup_type: 1)

    if @lunches && @dinners
      render :index
    else
      render json: ['No time interval found for today'], status: 200
    end
  end
end
