class BuyerSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :postings, through: :user
  attributes :id, :user_id, :rating
end
