class FreelancerPostingsController < ApplicationController

  def index
    @postings = Posting.freelancer_postings
    render json: @postings
  end

end
