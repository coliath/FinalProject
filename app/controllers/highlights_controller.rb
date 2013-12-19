class HighlightsController < ApplicationController

  before_filter :require_current_user!

  def create
    highlight = Highlight.new(params[:highlight])
    highlight.user_id = current_user.id
    highlight.resource_id = params[:resource_id]

    if highlight.save
      save_marks(highlight, params[:marks]) # fix this later
      render json: highlight
    else
      render_unprocessable(highlight)
    end
  end

  def index
    highlights = Highlight.where({user_id: current_user.id, resource_id: params[:resource_id] }).includes(:marks)

    render json: highlights.to_json(include: :marks)
  end

  def save_marks(highlight, marks) # for now... deadline!
    marks.each do |mark|
      highlight.marks.create(paragraph_text: mark)
    end
  end

end
