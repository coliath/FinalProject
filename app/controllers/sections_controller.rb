class SectionsController < ApplicationController

  before_filter :require_current_user!

  def create
    section = Section.new(params[:section])
    section.user_id = current_user.id

    if section.save
      render json: section
    else
      render_unprocessable(section)
    end
  end

  def show
    section = Section.find_by_id(params[:id])

    unless section.nil?
      render json: section
    else
      render_unprocessable("Could not locate section.")
    end
  end

  def index
    sections = Section.all

    render json: sections
  end

end
