class ApplicationController < ActionController::Base
  protect_from_forgery

  include SessionsHelper

  def render_unprocessable(message, json = true)
    unless message.is_a? String
      message = message.errors.full_messages
    end

    if json
      render json: message, status: 422
    else
      render message, status: 422
    end
  end

end
