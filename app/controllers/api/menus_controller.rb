class Api::MenusController < ApplicationController
  def index
    @school = School.find_by(id: params[:id])
    @today = Date.today
    @tomorrow = @today + 1
    
    if Time.now.hour < 21
      @menus = Menu.where(offered_date: @today).includes(:meal, :shop)
    else
      @menus = Menu.where(offered_date: @tomorrow).includes(:meal, :shop)
    end

    if @menus && @school
      @shops = params[:bounds] ? Shop.includes(:meals).in_bounds(bounds) : @school.shops.includes(:meals)
      shop_ids = @shops.map{ |shop| shop.id }

      @menus = @menus.select{ |menu| shop_ids.include?(menu.meal.shop_id) }

      render :index
    else
      render json: ['No meals found for today'], status: 200
    end
  end

  def create
    @menu = Menu.new(menu_params)
    @menu.offered_date = Date.parse(params[:offered_date])
    
    if validate_menu(@menu) && @menu.save
      render json: ['success'], status: 200
    else
      render json: @menu.errors.full_messages, status: 422
    end
  end

  # private

  def bounds
    JSON.parse(params[:bounds])
  end

  def menu_params
    params.require(:menu).permit(:meal_id, :shop_id, :lunch, :dinner, :lunch_quantity_available, :dinner_quantity_available)
  end

  def validate_menu(menu)
    meal = Meal.find(menu.meal_id)
    meal.shop_id == menu.shop_id
  end

end
