class FreelancerSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :rating, :projects
end
