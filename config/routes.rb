Rails.application.routes.draw do
  resources :projects
  resources :messages
  resources :conversations
  resources :users
  resources :postings
  resources :buyers
  resources :freelancers

  get "/me", to: "users#show"
  post "signup", to: "users#create"
  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/postings/freelancing", to: "freelancer_postings#index"
  get "/postings/buying", to: "buyer_postings#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
