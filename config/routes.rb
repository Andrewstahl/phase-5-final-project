Rails.application.routes.draw do
  resources :projects
  resources :messages
  resources :conversations
  resources :users
  resources :postings
  resources :buyers, only: [:index, :show]
  resources :freelancers, only: [:index, :show]

  get "/me", to: "users#show"
  post "signup", to: "users#create"
  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  
end
