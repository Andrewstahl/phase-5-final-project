class Posting < ApplicationRecord
  belongs_to :user
  has_many :projects, dependent: :destroy
  
  scope :freelancer_postings, -> { where(posting_type: "Freelancer") }
  scope :buyer_postings, -> { where(posting_type: "Buyer") }

  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true
  validates :price_unit, presence: true
  validates :posting_type, presence: true
  validates :posting_type, inclusion: { in: ["Freelancer", "Buyer"] }
  validates :categories, presence: true

end
