class CommentsController < ApplicationController

  before_filter :require_current_user!

  def create
    comment = Comment.new(params[:comment]);

    if comment.save
      render json: comment
    else
      render_unprocessable(comment)
    end
  end

  def index
    comments = Comment.where({ commentable_type: params[:type], commentable_id: params[:id] })

    render json: comments
  end

end
