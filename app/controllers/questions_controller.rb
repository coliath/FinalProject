class QuestionsController < ApplicationController

  before_filter :require_current_user!

  def create
    question = question.new(params[:question])
    question.user_id = current_user.id

    if question.save
      render json: question
    else
      render_unprocessable(question)
    end
  end

  def show
    question = question.find_by_id(params[:id])

    unless question.nil?
      render json: question
    else
      render_unprocessable("Could not locate question.")
    end
  end

  def index
    questions = question.where({ resource_id: params[:resource_id] })

    render json: questions
  end
end
