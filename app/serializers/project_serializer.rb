class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :freelancer_id, :buyer_id, :posting_id, :due_date, :cost, :freelancer_username, :buyer_username,
             :posting_title

  def freelancer_username
    object.freelancer.user.username
  end

  def buyer_username
    object.buyer.user.username
  end

  def posting_title
    object.posting.title
  end
end
