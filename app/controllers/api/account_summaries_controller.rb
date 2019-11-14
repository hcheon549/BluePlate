class Api::AccountSummariesController < ApplicationController
  def create
    @summary = AccountSummary.new(summary_params)

    if @summary.save
      render :show
    else
      render json: @summary.errors.full_messages, status: 422
    end
  end

  def update
    @summary = AccountSummary.find(params[:user_id])

    if @summary.update_attributes(
      policy_id: params[:summary][:policy_id]
      subscription_id: params[:summary][:subscription_id]
      )
      render :show
    else
      render json: @summary.errors.full_messages, status: 422
    end

  private

  def summary_params
    params.require(:account_summary).permit(:user_id, :subscription_id, :policy_id)
  end
end
