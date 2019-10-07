# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

# from https://stackoverflow.com/questions/43195899/how-to-generate-random-coordinates-within-a-circle-with-specified-radius

User.destroy_all
users = [
  {
    email: 'demo',
    name: "Bob Ross",
    password: 123456,
    preferred_city: 'New York',
    treats_left: 15,
    image_url: "https://res.cloudinary.com/mwojick/image/upload/v1532323181/TreatPal/bobross.jpg",
    company_name: "The Joy of Painting"
  }
]

users.each do |user|
  User.create!(user)
end

City.destroy_all

cities = [
  {
    name: "New York",
    latitude: 40.750617,
    longitude: -73.989161
  },
]

cities.each do |city|
  City.create!(city)
end

Shop.destroy_all

shops = []

shops.each_with_index do |shop, i|
  Shop.create!(shop)
end


Favorite.destroy_all