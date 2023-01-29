class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :conversation, null: false, foreign_key: true
      t.text :body
      t.integer :receiver_id
      t.integer :sender_id

      t.timestamps
    end
  end
end
