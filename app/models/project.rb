class Project < ApplicationRecord
  belongs_to :freelancer
  belongs_to :buyer
  belongs_to :posting

  validates :cost, presence: true
  validates :cost, numericality: { greater_than: 0 }
  validates :due_date, presence: true
end
