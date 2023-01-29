class MessageSerializer < ActiveModel::Serializer
  # belongs_to :conversation
  attributes :id, :conversation_id, :body, :sender, :created_at, :updated_at
end
