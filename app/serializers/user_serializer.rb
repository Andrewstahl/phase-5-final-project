class UserSerializer < ActiveModel::Serializer
  has_many :postings

  attributes :id, :username, :created_at, :freelancer_id, :buyer_id
  
  def freelancer_id
    return object.freelancer.id
  end
  
  def buyer_id
    return object.buyer.id
  end

end
