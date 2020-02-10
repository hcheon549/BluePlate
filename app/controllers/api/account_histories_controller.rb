class Api::AccountHistoriesController < ApplicationController
  def create
    @account_history = AccountHistory.new(history_params)
    @account_history.date = Date.today

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
