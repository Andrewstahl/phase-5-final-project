class BuyerPostingsController < ApplicationController

  def index
    @postings = Posting.buyer_postings
    render json: @postings
  end

end
