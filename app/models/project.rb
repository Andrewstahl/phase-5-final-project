class Project < ApplicationRecord
  belongs_to :freelancer
  belongs_to :buyer
  belongs_to :posting
end
