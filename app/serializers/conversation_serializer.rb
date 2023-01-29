class ConversationSerializer < ActiveModel::Serializer
  has_many :messages
  attributes :id, :user_ids, :messages
end
