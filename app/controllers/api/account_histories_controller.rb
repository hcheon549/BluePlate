class Api::AccountHistoriesController < ApplicationController
  def create
    @account_history = AccountHistory.new(history_params)
    @account_history.date = DateTime.now
    @account_history.action_data = params[:account_history][:action_data] || nil
    @account_history.resource_id = params[:account_history][:resource_id] || nil
    @account_history.memo = params[:account_history][:memo] || nil

    if @account_history.save
      render :show
    else
      render json: @account_history.errors.full_messages, status: 422
    end
  end

  private

  def history_params
    params.require(:account_history).permit(:user_id, :action_type)
  end

end
