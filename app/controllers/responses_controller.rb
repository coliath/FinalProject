class ResponsesController < ApplicationController

  before_filter :require_current_user!

  def create
    response = Response.new(params[:response])
    response.user_id = current_user.id
    response.discussion_id = params[:discussion_id]

    if response.save
      render json: response.to_json(include: :comments)
    else
      render_unprocessable(response)
    end
  end

  def show
    response = Response.find_by_id(params[:id])

    unless response.nil?
      render json: response
    else
      render_unprocessable("Could not locate response.")
    end
  end

  def index
    responses = Response.where({discussion_id: params[:discussion_id]})

    render json: responses.to_json(include: :comments)
  end
end
