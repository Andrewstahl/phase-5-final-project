class ConversationSerializer < ActiveModel::Serializer
  has_many :messages
  attributes :id, :users
end
