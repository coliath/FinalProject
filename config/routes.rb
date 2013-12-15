NewAuthDemo::Application.routes.draw do

  resources :users, only: [:create, :new, :show]

  resource :session, only: [:create, :destroy, :new]

  resources :resources, only: [:create, :show, :index] do

    resources :notes, only: [:create, :index]

    resources :sections, only: [:create, :show, :index]

    resources :questions, only: [:create, :show, :index] do

    	resources :answers, only: [:create, :show, :index]
    	
    end

  end

  root :to => "sessions#new"

end
