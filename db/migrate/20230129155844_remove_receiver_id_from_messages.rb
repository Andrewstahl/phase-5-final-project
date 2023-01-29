class RemoveReceiverIdFromMessages < ActiveRecord::Migration[7.0]
  def change
    remove_columns(:messages, :receiver_id)
  end
end
