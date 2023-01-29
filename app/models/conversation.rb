class Conversation < ApplicationRecord
  has_many :messages
  
  serialize :users, Array
end
