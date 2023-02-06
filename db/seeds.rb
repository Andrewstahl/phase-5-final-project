# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# 10.times do
#   user = User.create(
#     username: Faker::Name.name.gsub(" ", "").downcase,
#     password: "Testing123",
#     password_confirmation: "Testing123"
#   )
# end

posting_categories = ["Accounting", "Administrative", "Bookkeeping", "Data Entry", "Education", "Graphic Design", "Information Technology", "Marketing", "Project Management", "Recruiting", "Sales", "Software Development", "Therapy", "Web Development", "Writing"]
price_units = ["Hourly", "Daily", "Flat Rate"]
posting_types = ["Freelancer", "Buyer"]

20.times do 
  posting = Posting.create(
    user: User.all.sample,
    title: Faker::Lorem.sentence(word_count: 5, supplemental: true),
    description: Faker::Lorem.sentence(word_count: 50),
    categories: posting_categories.sample(rand(1..4)),
    price: rand(10..100),
    price_unit: price_units.sample,
    posting_type: posting_types.sample
  )
end