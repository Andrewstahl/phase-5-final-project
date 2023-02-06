class FreelancerSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :rating, :past_projects, :current_projects

  def past_projects
    return object.projects.where('due_date < ?', Time.new)
  end
  
  def current_projects
    return object.projects.where('due_date >= ?', Time.new)
  end

end
