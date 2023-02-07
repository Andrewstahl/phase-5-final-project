# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# 3.times do
#   user = User.create(
#     username: Faker::Name.name.gsub(" ", "").downcase,
#     password: "Testing123",
#     password_confirmation: "Testing123"
#   )
#   freelancer = Freelancer.create!(user: user, rating: 0.0)
#   buyer = Buyer.create!(user: user, rating: 0.0)
# end

posting_categories = ['Accounting', 'Administrative', 'Bookkeeping', 'Data Entry', 'Education', 'Graphic Design',
                      'Information Technology', 'Marketing', 'Project Management', 'Recruiting', 'Sales', 'Software Development', 'Therapy', 'Web Development', 'Writing']
price_units = ['Hourly', 'Daily', 'Flat Rate']
posting_types = %w[Freelancer Buyer]

2.times do
  Posting.create(
    user: User.postings?.sample,
    title: Faker::Lorem.sentence(word_count: 5, supplemental: true),
    description: Faker::Lorem.sentence(word_count: 50),
    categories: posting_categories.sample(rand(1..4)),
    price: rand(10..100),
    price_unit: price_units.sample,
    posting_type: posting_types.sample
  )
end

# date1 = Time.parse("2020-01-01 00:00:00")
# date2 = Time.parse("2023-12-31 12:00:00")

# 1.times do
#   user = User.sample
#   freelancer = Freelancer.sample
#   project = Project.create(
#     freelancer_id: freelancer.id,
#     buyer_id: Buyer.where("user_id != ?", freelancer.user_id),
#     posting_id: freelancer.user.postings.sample,
#     cost: rand(60..3000).round(-1),
#     due_date: rand(date1..date2)
#   )
# end
