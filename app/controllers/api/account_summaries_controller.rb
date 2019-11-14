class Api::AccountSummariesController < ApplicationController
  def create
    @summary = AccountSummary.new(summary_params)
    @summary.policy_id = Policy.find_by(policy_type: "Visitor").id

    if @summary.save
      render :show
    else
      render json: @summary.errors.full_messages, status: 422
    end
  end

  def update
    @summary = AccountSummary.find(params[:id])
    @policy_id = getPolicyId(params[:account_summary][:policy_type])

    if @summary.update_attributes(
      policy_id: @policy_id || @summary.policy_type,
      subscription_id: params[:account_summary][:subscription_id] || @summary.subscription_id,
      total_meal_credits: params[:account_summary][:total_meal_credit] || @summary.total_meal_credits,
      meal_credits_left: params[:account_summary][:meal_credits_left] || @summary.meal_credits_left
      )
      render :show
    else
      render json: @summary.errors.full_messages, status: 422
    end
  end

  private

  def summary_params
    params.require(:account_summary).permit(:user_id, :subscription_id, :policy_id)
  end

  def getPolicyId(policy_type)
    case policy_type
    when "Visitor"
      policy_id = Policy.find_by(policy_id: 700).id
    when "Lead"
      policy_id = Policy.find_by(policy_id: 500).id
    when "Ban"
      policy_id = Policy.find_by(policy_id: 400).id
    when "Member"
      policy_id = Policy.find_by(policy_id: 100).id
    when "Gift"
      policy_id = Policy.find_by(policy_id: 200).id
    end

    return policy_id
  end
end
