class BuyerSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :postings, through: :user
  has_many :projects
  attributes :id, :user_id, :rating, :projects
end
