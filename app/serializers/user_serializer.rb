class UserSerializer < ActiveModel::Serializer
  has_many :postings
  # belongs_to :freelancer
  # belongs_to :buyer

  attributes :id, :username, :created_at, :freelancer_id, :buyer_id

  def freelancer_id
    object.freelancer.id
  end

  def buyer_id
    object.buyer.id
  end
end
