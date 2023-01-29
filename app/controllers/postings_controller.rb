class PostingsController < ApplicationController
  
  before_action :get_user, only: [:create, :update, :destroy]
  before_action :get_posting, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # GET /postings/
  def index
    @postings = Posting.all
    render json: @postings
  end
  
  # GET /postings/:id
  def show
    render json: @posting
  end
  
  # POST /postings/:id
  def create
    if @user
      @posting = Posting.create(posting_params)
      @posting.user = @user
      # We initialize the categories as an array, so we need
      # to resave the categories from the parameters
      @posting.save!
      render json: @posting, status: :created
    else
      # Creates the posting and raises an exception if we don't have
      # a user attached to it
      @posting = Posting.create!(posting_params)
    end
  end
  
  # PATCH/PUT /posting/:id
  def update
    if @user.id == @posting.user_id
      @posting = Posting.update!(posting_params)
      render json: @posting, status: :created
    else
      render_not_authorized_response
    end
  end

  # DELETE /postings/:id
  def destroy
    if @user.id == @posting.user_id
      @posting.destroy
      head :no_content
    else
      render_not_authorized_response
    end
  end

  private

  def get_user
    @user = User.find(session[:user_id])
  end

  def get_posting
    @posting = Posting.find(params[:id])
  end

  def posting_params
    params.permit(:title, :description, :categories, :price, :price_unit, :posting_type, :user_id).select { |k, v| !v.nil? }
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: ["Posting not found"] }, status: :not_found
  end

  def render_not_authorized_response
    render json: { errors: "You cannot make a change to a habit that does not belong to your account" }, status: :unauthorized
  end

end
