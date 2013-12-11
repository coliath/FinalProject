NewAuthDemo::Application.routes.draw do

  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]
  resources :resources, only: [:create, :show, :index]
  resources :sections, only: [:create, :show, :index]

  root :to => "users#new"

end
