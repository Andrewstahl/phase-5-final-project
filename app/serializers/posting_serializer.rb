class PostingSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :title, :description, :categories, :price, :price_unit, :project_type
end
