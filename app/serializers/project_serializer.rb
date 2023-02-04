class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :freelancer_id, :buyer_id, :posting_id, :due_date, :cost
end
