class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]

  def create
    username = params[:user][:username].titleize

    user = User.find_by_credentials(
      username,
      params[:user][:password]
    )

    if user.nil?
      render_unprocessable("Credentials were wrong")
    else
      self.current_user = user
      render "users/show"
    end
  end

  def start

  end

  def destroy
    logout_current_user!
    redirect_to new_session_url
  end

  def new
  end

end
