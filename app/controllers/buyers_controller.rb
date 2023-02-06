class BuyersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  skip_before_action :authorized
  
  # GET /buyers
  def index
    render json: Buyer.all
  end
  
  # GET /buyer/:id
  def show
    @buyer = Buyer.find(params[:id])
    render json: @buyer
  end

  private

  def render_not_found_response
    render json: { errors: ["Buyer not found"] }, status: :not_found
  end
end
