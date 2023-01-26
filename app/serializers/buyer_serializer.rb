class BuyerSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :postings, through: :user
  attributes :id, :rating
end
