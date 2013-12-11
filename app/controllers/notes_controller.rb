class NotesController < ApplicationController

  before_filter :require_current_user!

  def create
    note = Note.new(params[:note])
    note.user_id = current_user.id


  end

  def show

  end

  def index

  end


end
