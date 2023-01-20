Rails.application.routes.draw do
  resources :users

  get "/me", to: "users/show"
  post "signup", to: "users/create"
  post "/login", to: "sessions/create" 
  delete "/logout", to: "sessions/destroy"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

  # Defines the root path route ("/")
  # root "articles#index"
end
