# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

ActiveRecord::Base.transaction do
  User.destroy_all

  users = [
    {
      email: 'demo@blueplate.io',
      password: 123456,
      fname: 'Eric',
      lname: 'Cheon',
      school_id: 1,
      enrolled_school: 'Rutgers University–New Brunswick',
      meals_left: 15
    },
  ]

  users.each do |user|
    User.create!(user)
  end
  puts "Users created"
end

ActiveRecord::Base.transaction do
  School.destroy_all

  schools = [
    {
      name: "Rutgers University–New Brunswick",
      latitude: 40.498080,
      longitude: -74.448920
    },
    {
      name: "Pennsylvania State University–University Park",
      latitude: 40.792650,
      longitude: -77.859082
    }
  ]

  schools.each do |school|
    School.create!(school)
  end
  puts "Schools created"
end

ActiveRecord::Base.transaction do
  Plan.destroy_all

  plans = [
    {
      name: "12 Meals per week",
      plan_type: "semester",
      meals: 180,
      price: 1078.20
    },
    {
      name: "8 Meals per week",
      plan_type: "semester",
      meals: 120,
      price: 778.80
    },
    {
      name: "4 Meals per week",
      plan_type: "semester",
      meals: 60,
      price: 419.40
    }
  ]

  plans.each do |plan|
    Plan.create!(plan)
  end
  puts "Plans created"
end


# Example reverse geocode
# https://maps.googleapis.com/maps/api/geocode/json?latlng=34.019022,-118.257957&key=AIzaSyCdt5y8QHtz0FgnzgMLAc4-rfVPXz48B-8

ActiveRecord::Base.transaction do
  Shop.destroy_all

  schools = School.all

  shops = [
    {
      name: "Stuff Yer Face",
      address: "49 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.498080,
      longitude: -74.448920,
      school_id: schools[0][:id],
    }, {
      name: "KBG Korean BBQ & Grill",
      address: "6 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.498080,
      longitude: -74.448920,
      school_id: schools[0][:id],
    }, {
      name: "Noodle Gourmet",
      address: "43 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.497950,
      longitude: -74.448530,
      school_id: schools[0][:id],
    }, {
      name: "Krispy Pizza",
      address: "50 College Ave, New Brunswick, NJ 08901",
      latitude: 40.499540,
      longitude: -74.448630,
      school_id: schools[0][:id],
    }, {
      name: "Jersey Mike's Subs",
      address: "44 College Ave, New Brunswick, NJ 08901",
      latitude: 40.499290,
      longitude: -74.448380,
      school_id: schools[0][:id],
    }, {
      name: "Nirvanis Indian Kitchen",
      address: "68 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.497910,
      longitude: -74.449700,
      school_id: schools[0][:id],
    },{
      name: "Olive Branch",
      address: "37 Bartlett St, New Brunswick, NJ 08901",
      latitude: 40.501350,
      longitude: -74.452830,
      school_id: schools[0][:id],
    },{
      name: "Zookini Pizza & Restaurant",
      address: "60 Sicard St, New Brunswick, NJ 08901",
      latitude: 40.502708,
      longitude: -74.454468,
      school_id: schools[0][:id],
    },{
      name: "Kelly's Korner",
      address: "75 Morrell St, New Brunswick, NJ 08901",
      latitude: 40.501000,
      longitude: -74.455060,
      school_id: schools[0][:id],
    },{
      name: "Daniel's Pizzeria",
      address: "204 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.500340,
      longitude: -74.456000,
      school_id: schools[0][:id],
    },{
      name: "Seed Burger",
      address: "176 Easton Ave New Brunswick, NJ 08901",
      latitude: 40.499930,
      longitude: -74.454930,
      school_id: schools[0][:id],
    },{
      name: "Thai Noodle",
      address: "174 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.499780,
      longitude: -74.454630,
      school_id: schools[0][:id],
    },{
      name: "Wings Over Rutgers",
      address: "152 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.499460,
      longitude: -74.453740,
      school_id: schools[0][:id],
    },{
      name: "The Original Pizza City",
      address: "145 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.499810,
      longitude: -74.453430,
      school_id: schools[0][:id],
    }
  ]


  shops.each_with_index do |shop, i|
    Shop.create!(shop)
  end
  puts "Shops created"
end

# https://source.unsplash.com/collection/8746283/480x480/?sig=1/

ActiveRecord::Base.transaction do
  Meal.destroy_all

  imageWidth = 480
  imageHeight = 480
  collectionID = 8746283
  meals = []

  shops = Shop.all

  (shops.length).times do |i|
    name = Faker::Food.dish

    description = ''
    4.times do |j|
      description += Faker::Food.ingredient + ", "
    end
    description += Faker::Food.ingredient

    price = rand(3.0..8.0).round(2)

    randomNumber = rand(1..200)
    image_url = "https://source.unsplash.com/collection/#{collectionID}/#{imageWidth}x#{imageHeight}/?sig=#{randomNumber}"

    shop_id = shops[i].id

    meals << {
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      shop_id: shop_id
    }
  end

  meals.each do |meal|
    Meal.create!(meal)
  end
  puts "Meals created"
end

ActiveRecord::Base.transaction do
  Favorite.destroy_all
  demo = User.find_by(email: 'demo@blueplate.io')
  shops = Shop.all

  shops.each do |s|
    if (rand(1..10) < 4)
      Favorite.create!({shop_id: s.id, user_id: demo.id})
    end
  end
  puts "Favorites created"
end

ActiveRecord::Base.transaction do
  Reservation.destroy_all
  demo = User.find_by(email: 'demo@blueplate.io')
  meals = Meal.all

  times = ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30']
  date = Date.today + 1

  20.times do |t|
    if (rand(1..10) < 7)
      meal_id = meals.sample.id
      time = (date.to_s + " " + times.sample).to_time
      Reservation.create!({meal_id: meal_id, user_id: demo.id, time: time, date: date})
    end
    date = date - 1
  end

  puts "Reservations created"
end
