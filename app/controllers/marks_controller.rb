class MarksController < ApplicationController

  before_filter :require_current_user!

  def create
    mark = Mark.new(params[:mark])
    mark.user_id = current_user.id
    mark.resource_id = params[:resource_id]

    if mark.save
      render json: mark
    else
      render_unprocessable(mark)
    end
  end

  def index
    marks = Mark.where({user_id: current_user.id, resource_id: params[:resource_id] })

    render json: marks
  end

end
