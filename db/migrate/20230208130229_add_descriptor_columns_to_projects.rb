class AddDescriptorColumnsToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column(:projects, :freelancer_username, :string)
    add_column(:projects, :buyer_username, :string)
    add_column(:projects, :posting_title, :string)
  end
end
