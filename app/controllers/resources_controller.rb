class ResourcesController < ApplicationController

  before_filter :require_current_user!

  def create
    resource = Resource.new(params[:resource])
    resource.user_id = current_user.id

    if resource.save
      render json: resource
    else
      render_unprocessable(resource)
    end
  end

  def show
    resource = Resource.find_by_id(params[:id])

    unless resource.nil?
      render json: resource
    else
      render_unprocessable("Could not locate resource.")
    end
  end

  def index
    resources = Resource.all

    render json: resources
  end

end
