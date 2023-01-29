class ChangeSenderIdFromMessages < ActiveRecord::Migration[7.0]
  def change
    remove_column(:messages, :sender_id)
    add_column(:messages, :sender, :string)
  end
end
