class ChangeUserIdsFromConversations < ActiveRecord::Migration[7.0]
  def change
    remove_column(:conversations, :user_ids)
    add_column(:conversations, :users, :string, array: true, default: [])
  end
end
