class Api::AccountSummariesController < ApplicationController
  def create
    @summary = AccountSummary.new(summary_params)
    @summary.policy_id = Policy.find_by(policy_type: "Visitor").id
    if @summary.save
      UserMailer.notify_signup(@summary).deliver_later(wait: 1.second)
      render :show
    else
      render json: @summary.errors.full_messages, status: 422
    end
  end

  def update
    @summary = AccountSummary.find(params[:id])
    wasLead = @summary.policy_id == getPolicyId('Lead')
    @policy_id = getPolicyId(params[:account_summary][:policy_type])
    
    if @summary.update_attributes(
      policy_id: @policy_id || @summary.policy_type,
      subscription_id: params[:account_summary][:subscription_id] || @summary.subscription_id,
      total_meal_credits: params[:account_summary][:total_meal_credits] || @summary.total_meal_credits,
      meal_credits_left: params[:account_summary][:meal_credits_left] || @summary.meal_credits_left
      )
      # Sending welcome email to a new user
      if wasLead && (@summary.policy_id == Policy.find_by(policy_id: 100).id)
        @user = @summary.user
        UserMailer.welcome_email(@user).deliver_later(wait: 5.second)
        UserMailer.notify_member(@summary).deliver_later(wait: 2.second)
      end

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

    policy_id
  end

  def getLeadPolicyId

  end

  def getMemberPolicyId
    Policy.find_by(policy_type: 'Member').policy_id
  end
end
