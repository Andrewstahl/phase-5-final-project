class Message < ApplicationRecord
  belongs_to :conversation

  validates :body, presence: true
  validates :sender, presence: true
end
