class Posting < ApplicationRecord
  belongs_to :user

  serialize :categories, Array
end
