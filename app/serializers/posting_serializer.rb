class PostingSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :title, :description, :categories, :price, :price_unit, :posting_type
end
