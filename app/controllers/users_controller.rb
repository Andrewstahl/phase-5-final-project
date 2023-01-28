class UsersController < ApplicationController
  before_action :current_user, only: [:show, :update, :destroy]
  skip_before_action :authorized, only: [:index, :create]
  
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  # GET /users
  def index
    render json: User.all
  end
  
  # GET /me
  def show
    @user = User.find(session[:user_id])
    render json: @user
  end
  
  # POST /users
  # POST /signup
  def create
    @user = User.create!(user_params)
    @freelancer = Freelancer.create!(user: @user, rating: 0.0)
    @buyer = Buyer.create!(user: @user, rating: 0.0)
    session[:user_id] = @user.id
    render json: @user, status: :created
  end
  
  # POST/PATCH 
  def update
    @user = User.find(session[:user_id])
    @user.update!(user_params)
    render json: @user
  end
  
  def destroy
    @user = User.find(session[:user_id])
    @user.destroy
    head :no_content
  end

  private

  def current_user
    @user = User.find(session[:user_id])
  end

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_unauthorized_user_response
    render json: { errors: ["Unauthorized user"] }, status: :unauthorized
  end

end
