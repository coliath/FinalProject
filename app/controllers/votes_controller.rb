class VotesController < ApplicationController


  before_filter :require_current_user!

  def create
    vote = Vote.new(params[:vote])
    vote.voteable_type = params[:type]
    vote.voteable_id = params[:id]
    vote.user_id = current_user.id

    if vote.save
      render json: vote
    else
      render_unprocessable(vote)
    end
  end

  def index
    votes = Vote.where({voteable_type: params[:type], voteable_id: params[:id]})

    render json: votes
  end




end
