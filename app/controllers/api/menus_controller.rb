class Api::MenusController < ApplicationController
  def index
    @today = Date.today
    @menus = Menu.where(offered_date: today)
    @school = School.find_by(id: params[:id])

    if @menus && @school
      @shops = params[:bounds] ? Shop.in_bounds(bounds) : @school.shops
      shop_ids = @shops.map{ |shop| shop.id }

      @menus = @menus.select{ |menu| shop_ids.include?(menu.meal.shop_id) }

      render :index
    else
      render json: ['No meals found for today'], status: 200
    end
  end

  # private

  # def bounds
  #   JSON.parse(params[:bounds])
  # end

end
