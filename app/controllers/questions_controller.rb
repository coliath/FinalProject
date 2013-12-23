class QuestionsController < ApplicationController

  before_filter :require_current_user!

  def create
    question = Question.new(params[:question])
    question.user_id = current_user.id

    if question.save
      render json: question
    else
      render_unprocessable(question)
    end
  end

  def show
    question = Question.find_by_id(params[:id])

    unless question.nil?
      render json: question
    else
      render_unprocessable("Could not locate question.")
    end
  end

  def index
    questions = Question.where({ resource_id: params[:resource_id] })
    # eventually, once you know exactly what you need, write a query to fetch everything need on a resource in one swoop
    render json: questions.to_json(include: {comments: {include: :user}, votes: {}, answers: {include: {comments: {include: :user}, votes:{}}}, user:{}})
  end

end
