class UserSerializer < ActiveModel::Serializer
  has_one :buyer
  has_one :freelancer
  has_many :postings
  attributes :id, :username
end
