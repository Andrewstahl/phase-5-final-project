class Freelancer < ApplicationRecord
  belongs_to :user
  has_many :projects, dependent: :destroy

end
