class CommentsController < ApplicationController

  before_filter :require_current_user!

  def create
    comment = Comment.new(params[:comment])
    comment.commentable_type = params[:type]
    comment.commentable_id = params[:id]
    comment.user_id = current_user.id

    if comment.save
      render json: comment
    else
      render_unprocessable(comment)
    end
  end

  def index
    comments = Comment.where({commentable_type: params[:type], commentable_id: params[:id]})

    render json: comments
  end

end
