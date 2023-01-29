class Conversation < ApplicationRecord
  has_many :messages
  scope :user_messages, ->(username) { where("users @> ?", "{#{username}}") }

end
