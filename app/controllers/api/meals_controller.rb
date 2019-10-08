class Api::MealsController < ApplicationController
  def index
    @school = School.find_by(name: params[:school])

    if @school

      @meals = @school.meals

      @shops = params[:bounds] ? Shop.in_bounds(bounds) : @school.shops
      shop_ids = @shops.map { |s| s.id }

      @meals = @meals.select { |meal| shop_ids.include?(meal.shop_id) }

      render :index
    else
      render json: ['No meals found'], status: 200
    end
  end

  def search
    @school = School.find_by(name: params[:school])
    if @school
      all_meals = @school.meals.includes(:shop)
      all_shops = params[:bounds] ? Shop.in_bounds(bounds) : @school.shops
      
      shop_ids = all_shops.map { |s| s.id }

      all_meals = all_meals.select { |meal| shop_ids.include?(meal.shop_id) }

      @shops = []
      @meals = []

      all_meals.each do |meal|
        if meal.name.downcase.include?(params[:search].downcase)

          @meals << meal
          @shops << meal.shop
        end
        if meal.shop.name.downcase.include?(params[:search].downcase)
          @meals << meal
          @shops << meal.shop
        end
      end

      if @meals.empty?
        render json: ['No meals found'], status: 200
      else
        render :search
      end

    else
      render json: ['No school found'], status: 200
    end
  end

  private

  def bounds
    JSON.parse(params[:bounds])
  end

end
