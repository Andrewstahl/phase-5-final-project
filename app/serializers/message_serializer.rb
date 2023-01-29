class MessageSerializer < ActiveModel::Serializer
  # belongs_to :conversation
  attributes :id, :conversation_id, :body, :sender
end
