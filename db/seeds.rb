# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

20.times do
  user = User.create(
    username: Faker::Name.name.gsub(' ', '').downcase,
    password: 'Testing123',
    password_confirmation: 'Testing123'
  )
  Freelancer.create!(user: user, rating: 0.0)
  Buyer.create!(user: user, rating: 0.0)
end

posting_categories =
  ['Accounting', 'Administrative', 'Bookkeeping', 'Data Entry', 'Education', 'Graphic Design',
   'Information Technology', 'Marketing', 'Legal', 'Other', 'Project Management', 'Recruiting', 'Sales', 'Software Development', 'Therapy', 'Web Development',
   'Writing']

price_units = ['Hourly', 'Daily', 'Flat Rate']
posting_types = %w[Freelancer Buyer]

30.times do
  Posting.create!(
    user: User.all.sample,
    title: Faker::Lorem.sentence(word_count: 5, supplemental: true),
    description: Faker::Lorem.sentence(word_count: 50),
    categories: posting_categories.sample(rand(1..4)),
    price: rand(10..100),
    price_unit: price_units.sample,
    posting_type: posting_types.sample
  )
end

date1 = Time.parse('2020-01-01 00:00:00')
date2 = Time.parse('2023-12-31 12:00:00')

20.times do
  user = User.postings?.sample
  buyer = Buyer.where('user_id != ?', user.id).sample
  posting = user.postings.sample
  Project.create!(
    freelancer_id: user.freelancer.id,
    buyer_id: buyer.id,
    posting_id: posting.id,
    freelancer_username: user.username,
    buyer_username: buyer.user.username,
    posting_title: posting.title,
    cost: rand(60..3000).round(-1),
    due_date: rand(date1..date2)
  )
end
