class DiscussionsController < ApplicationController

  before_filter :require_current_user!

  def create
    discussion = Discussion.new(params[:discussion])
    discussion.user_id = current_user.id

    if discussion.save
      render json: discussion
    else
      render_unprocessable(discussion)
    end
  end

  def show
    discussion = Discussion.find_by_id(params[:id])

    unless discussion.nil?
      render json: discussion
    else
      render_unprocessable("Could not locate discussion.")
    end
  end

  def index
    discussions = Discussion.where({ resource_id: params[:resource_id] })

    render json: discussions
  end

end
