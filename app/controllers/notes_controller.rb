class NotesController < ApplicationController

  before_filter :require_current_user!

  def create
    note = Note.new(params[:note])
    note.user_id = current_user.id

    if note.save
      render json: note
    else
      render_unprocessable(note)
    end
  end

  def show
    note = Note.find_by_id(params[:id])

    unless note.nil?
      render json: note
    else
      render_unprocessable("Could not locate note.")
    end
  end

  def index
    notes = Note.all

    render json: notes
  end


end