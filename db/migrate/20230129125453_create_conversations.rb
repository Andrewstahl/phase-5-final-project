class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.integer :user_ids, array: true, default: []

      t.timestamps
    end
  end
end
