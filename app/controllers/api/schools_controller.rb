class Api::SchoolsController < ApplicationController
  def index
    @schools = School.all

    if @schools
      render :index
    else
      render json: ["No Schools found"], status: 404
    end

  end
end
