NewAuthDemo::Application.routes.draw do

  resources :users, only: [:show]

  resource :session, only: [:create, :destroy, :new]

  resources :comments, only: [:create, :index]

  resources :votes, only: [:create, :index]

  resources :resources, only: [:create, :show, :index] do

    resources :highlights, only: [:create, :index]

    resources :discussions, only: [:create, :show, :index] do

      resources :responses, only: [:create, :show, :index]
      
    end

    resources :notes, only: [:create, :index, :update]

    resources :sections, only: [:create, :show, :index]

    resources :questions, only: [:create, :show, :index] do

    	resources :answers, only: [:create, :show, :index]

    end

  end

  root :to => "sessions#new"

end
