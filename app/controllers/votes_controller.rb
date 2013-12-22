class VotesController < ApplicationController


  before_filter :require_current_user!

  def create
    vote = Vote.new
    vote.vote_type = params[:vote_type];
    vote.voteable_type = params[:type]
    vote.voteable_id = params[:id]
    vote.user_id = current_user.id

    if duplicate_vote?(vote)
    	render_unprocessable("Duplicate Vote")
    	return
    end

    message = check_for_opposing_vote(vote)

    if vote.save
      render json: vote, message: message
    else
      render_unprocessable(vote)
    end
  end

  def index
    votes = Vote.where({voteable_type: params[:type], voteable_id: params[:id]})

    render json: votes
  end

  def check_for_opposing_vote(vote) # move these to the model?
  	opposing_vote_type = "Up" if vote.vote_type == "Down"
  	opposing_vote_type = "Down" if vote.vote_type == "Up"

  	opposing_vote = Vote.where(user_id: vote.user_id, voteable_type: vote.voteable_type, voteable_id: vote.voteable_id, vote_type: opposing_vote_type)
  	unless opposing_vote.empty?
  		opposing_vote.first.destroy
  		return "Deleted Opposing Vote"
  	end

  	"Success"
  end

  def duplicate_vote?(vote)
  	duplicate_vote = Vote.where(user_id: vote.user_id, voteable_type: vote.voteable_type, voteable_id: vote.voteable_id, vote_type: vote.vote_type)
  	if duplicate_vote.empty?
  		return false
  	else
  		return true
  	end
  end




end
