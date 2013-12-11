class ResourcesController < ApplicationController


  def create
    resource = Resource.new(params[:resource])
    resource.user_id = current_user.id

    if resource.save
      render json: resource
    else
      render json: resource.errors.full_messages, status: 422
    end
  end

  def show
    resource = Resource.find_by_id(params[:id])

    unless resource.nil?
      render json: resource
    else
      render json: "Could not find resource.", status: 422
    end
  end

  def index
    resources = Resource.all

    render json: resources
  end

end
