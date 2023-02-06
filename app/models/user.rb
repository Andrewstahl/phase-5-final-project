class User < ApplicationRecord
  has_secure_password
  has_one :buyer, dependent: :destroy
  has_one :freelancer, dependent: :destroy
  has_many :postings, dependent: :destroy

  validates :username, presence: true
  validates :username, uniqueness: true
  # validates :password, presence: true
end
