class CreatePostings < ActiveRecord::Migration[7.0]
  def change
    create_table :postings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.string :categories, array: true, default: []
      t.float :price
      t.string :price_unit
      t.string :posting_type 

      t.timestamps
    end
  end
end
