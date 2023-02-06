class FreelancersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  skip_before_action :authorized
  
  # GET /freelancers
  def index
    render json: Freelancer.all
  end
  
  # GET /freelancer/:id
  def show
    @freelancer = Freelancer.find(params[:id])
    render json: @freelancer
  end

  private

  def render_not_found_response
    render json: { errors: ["Freelancer not found"] }, status: :not_found
  end

end
