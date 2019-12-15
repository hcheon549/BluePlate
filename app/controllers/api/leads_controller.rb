class Api::LeadsController < ApplicationController
  def create
    @lead = Lead.new(lead_params)

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
