class NotesController < ApplicationController

  before_filter :require_current_user!

  def create
    note = Note.new(params[:note])
    note.user_id = current_user.id
    note.resource_id = params[:resource_id]
    note.private = false unless params[:note][:private]

    if note.save
      render json: note
    else
      render_unprocessable(note)
    end
  end

  def update
    note = Note.find(params[:id]);

    if note.update_attributes(params[:note]);
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
    notes = Note.where({user_id: current_user.id, resource_id: params[:resource_id] })

    render json: notes
  end


end
