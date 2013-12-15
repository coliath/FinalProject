class AnswersController < ApplicationController

  before_filter :require_current_user!

  def create
    answer = Answer.new(params[:answer])
    answer.user_id = current_user.id

    if answer.save
      render json: answer
    else
      render_unprocessable(answer)
    end
  end

  def show
    answer = Answer.find_by_id(params[:id])

    unless answer.nil?
      render json: answer
    else
      render_unprocessable("Could not locate answer.")
    end
  end

  def index
    answers = Answer.where({question_id: params[:question_id] })

    render json: answers
  end

end
