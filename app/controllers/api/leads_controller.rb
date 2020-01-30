class Api::LeadsController < ApplicationController
  def create
    @lead = Lead.new(lead_params)
    @lead.time_now = current_time
    @lead.time_current = current_date

    if @lead.save
      LeadMailer.new_lead(@lead).deliver_now
      render json: @lead
    else
      render json: @lead.errors.full_messages, status: 422
    end
  end

  def lead_params
    params.require(:lead).permit(:email, :campus, :wishlist)
  end
end
