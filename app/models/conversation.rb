class Conversation < ApplicationRecord
  has_many :messages
  scope :user_messages, ->(user_id) { where(user_id => :users) }

  # serialize :users, Array
end
