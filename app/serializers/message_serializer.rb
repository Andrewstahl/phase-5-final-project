class MessageSerializer < ActiveModel::Serializer
  belongs_to :conversation
  attributes :id, :conversation_id, :body, :receiver_id, :sender_id
end
