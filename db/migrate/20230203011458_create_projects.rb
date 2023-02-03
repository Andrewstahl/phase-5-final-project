class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.references :freelancer, null: false, foreign_key: true
      t.references :buyer, null: false, foreign_key: true
      t.references :posting, null: false, foreign_key: true
      t.datetime :due_date
      t.float :cost

      t.timestamps
    end
  end
end
