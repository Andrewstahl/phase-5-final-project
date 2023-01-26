class CreateFreelancers < ActiveRecord::Migration[7.0]
  def change
    create_table :freelancers do |t|
      t.references :user, null: false, foreign_key: true
      t.float :rating

      t.timestamps
    end
  end
end
