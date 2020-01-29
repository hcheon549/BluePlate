class Api::LeadsController < ApplicationController
  def create
    @lead = Lead.new(lead_params)
    @lead.time_now = Time.now
    @lead.time_current = Time.current.in_time_zone('EST')
    @lead.time_utc = Time.now.utc
    @lead.time_utc_offset = TIME_NOW

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
