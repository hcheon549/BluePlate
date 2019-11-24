# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'tod'

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
  Policy.destroy_all

  policies = [
    {
      policy_id: 100,
      name: "Credit",
      description: 'Fully paid member',
      policy_type: 'Member',
    },{
      policy_id: 200,
      name: "Free",
      description: 'Free gift',
      policy_type: 'Member',
    },{
      policy_id: 500,
      name: "Lead",
      description: 'Signed up but haven\'t paid',
      policy_type: 'Lead',
    },{
      policy_id: 700,
      name: "Visitor",
      description: 'Visitor',
      policy_type: 'Visitor',
    },{
      policy_id: 400,
      name: "Chargeback",
      description: 'Chargeback',
      policy_type: 'Ban',
    },
  ]

  policies.each do |policy|
    Policy.create!(policy)
  end
  puts "Policies created"
end

ActiveRecord::Base.transaction do
  Plan.destroy_all

  plans = [
    {
      name: "12 Meals",
      plan_type: "semester",
      meals: 180,
      price: 1078.20
    },
    {
      name: "8 Meals",
      plan_type: "semester",
      meals: 120,
      price: 778.80
    },
    {
      name: "4 Meals",
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

ActiveRecord::Base.transaction do
  PickupTime.destroy_all

  lunch_time = [
    { pickup_type: 0, start: Tod::TimeOfDay.new(11, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(11, 45).strftime("%I:%M %p") },
    { pickup_type: 0, start: Tod::TimeOfDay.new(11, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(12).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(12).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(12, 15).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(12, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(12, 30).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(12, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(12, 45).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(12, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(13).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(13).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(13, 15).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(13, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(13, 30).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(13, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(13, 45).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(13, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(14).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(14).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(14, 15).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(14, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(14, 30).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(14, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(14, 45).strftime("%I:%M %p") }, 
    { pickup_type: 0, start: Tod::TimeOfDay.new(14, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(15).strftime("%I:%M %p") }, 
  ]

  lunch_time.each do |time|
    PickupTime.create!(time)
  end
  puts "Lunch Times created"

  dinner_time = [
    { pickup_type: 1, start: Tod::TimeOfDay.new(17).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(17, 15).strftime("%I:%M %p") },
    { pickup_type: 1, start: Tod::TimeOfDay.new(17, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(17, 30).strftime("%I:%M %p") },
    { pickup_type: 1, start: Tod::TimeOfDay.new(17, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(17, 45).strftime("%I:%M %p") },
    { pickup_type: 1, start: Tod::TimeOfDay.new(17, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(18).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(18).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(18, 15).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(18, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(18, 30).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(18, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(18, 45).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(18, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(19).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(19).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(19, 15).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(19, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(19, 30).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(19, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(19, 45).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(19, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(20).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(20).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(20, 15).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(20, 15).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(20, 30).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(20, 30).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(20, 45).strftime("%I:%M %p") }, 
    { pickup_type: 1, start: Tod::TimeOfDay.new(20, 45).strftime("%I:%M %p"), end: Tod::TimeOfDay.new(21).strftime("%I:%M %p") }, 
  ]

  dinner_time.each do |time|
    PickupTime.create!(time)
  end
  puts "Dinner Times created"
end

ActiveRecord::Base.transaction do
  User.destroy_all

  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  pennState = School.find_by(name: "Pennsylvania State University–University Park")

  users = [
    {
      email: 'rutgers@gmail.com',
      password: 'ececec',
      fname: 'Eric',
      lname: 'Cheon',
      school_id: rutgers.id
    },{
      email: 'penn@gmail.com',
      password: 'ececec',
      fname: 'Eric',
      lname: 'Cheon',
      school_id: pennState.id
    },
  ]

  users.each do |user|
    User.create!(user)
  end
  puts "Users created"
end

ActiveRecord::Base.transaction do
  Subscription.destroy_all

  rutgers = User.find_by(email: 'rutgers@gmail.com')
  penn = User.find_by(email: 'penn@gmail.com')
  plans = Plan.all
  rutgers_plan = plans[rand(0..plans.length-1)]
  penn_plan = plans[rand(0..plans.length-1)]

  subscriptions = [
    {
      user_id: rutgers.id,
      plan_id: rutgers_plan.id,
      meal_credit: rutgers_plan.meals,
      subscription_start: Date.new(2020, 1, 22),
      subscription_end: Date.new(2020, 5, 13)
    },{
      user_id: penn.id,
      plan_id: penn_plan.id,
      meal_credit: penn_plan.meals,
      subscription_start: Date.new(2020, 1, 22),
      subscription_end: Date.new(2020, 5, 13)
    },
  ]

  subscriptions.each do |subscription|
    Subscription.create!(subscription)
  end
  puts "Subscriptions created"
end

ActiveRecord::Base.transaction do
  AccountSummary.destroy_all

  rutgers = User.find_by(email: 'rutgers@gmail.com')
  penn = User.find_by(email: 'penn@gmail.com')

  memberPolicy = Policy.find_by(policy_type: 'Member')

  summaries = [
    {
      user_id: rutgers.id,
      subscription_id: rutgers.subscription.id,
      policy_id: memberPolicy.id,
      total_meal_credits: rutgers.subscription.meal_credit,
      meal_credits_left: rutgers.subscription.meal_credit
    },{
      user_id: penn.id,
      subscription_id: penn.subscription.id,
      policy_id: memberPolicy.id,
      total_meal_credits: penn.subscription.meal_credit,
      meal_credits_left: penn.subscription.meal_credit
    },
  ]

  summaries.each do |summary|
    AccountSummary.create!(summary)
  end
  puts "AccountSummary created"
end


ActiveRecord::Base.transaction do
  Shop.destroy_all

  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  pennState = School.find_by(name: "Pennsylvania State University–University Park")

  shops = [
    {
      name: "Stuff Yer Face",
      address: "49 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.498080,
      longitude: -74.448920,
      school_id: rutgers.id,
    }, {
      name: "KBG Korean BBQ & Grill",
      address: "6 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.497090,
      longitude: -74.447200,
      school_id: rutgers.id,
    }, {
      name: "Noodle Gourmet",
      address: "43 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.497950,
      longitude: -74.448530,
      school_id: rutgers.id,
    }, 
    # {
    #   name: "Krispy Pizza",
    #   address: "50 College Ave, New Brunswick, NJ 08901",
    #   latitude: 40.499540,
    #   longitude: -74.448630,
    #   school_id: rutgers.id,
    # }, {
    #   name: "Jersey Mike's Subs",
    #   address: "44 College Ave, New Brunswick, NJ 08901",
    #   latitude: 40.499290,
    #   longitude: -74.448380,
    #   school_id: rutgers.id,
    # }, {
    #   name: "Nirvanis Indian Kitchen",
    #   address: "68 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.497910,
    #   longitude: -74.449700,
    #   school_id: rutgers.id,
    # },{
    #   name: "Olive Branch",
    #   address: "37 Bartlett St, New Brunswick, NJ 08901",
    #   latitude: 40.501350,
    #   longitude: -74.452830,
    #   school_id: rutgers.id,
    # },{
    #   name: "Zookini Pizza & Restaurant",
    #   address: "60 Sicard St, New Brunswick, NJ 08901",
    #   latitude: 40.502708,
    #   longitude: -74.454468,
    #   school_id: rutgers.id,
    # },{
    #   name: "Kelly's Korner",
    #   address: "75 Morrell St, New Brunswick, NJ 08901",
    #   latitude: 40.501000,
    #   longitude: -74.455060,
    #   school_id: rutgers.id,
    # },{
    #   name: "Daniel's Pizzeria",
    #   address: "204 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.500340,
    #   longitude: -74.456000,
    #   school_id: rutgers.id,
    # },{
    #   name: "Seed Burger",
    #   address: "176 Easton Ave New Brunswick, NJ 08901",
    #   latitude: 40.499930,
    #   longitude: -74.454930,
    #   school_id: rutgers.id,
    # },{
    #   name: "Thai Noodle",
    #   address: "174 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.499780,
    #   longitude: -74.454630,
    #   school_id: rutgers.id,
    # },{
    #   name: "Wings Over Rutgers",
    #   address: "152 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.499460,
    #   longitude: -74.453740,
    #   school_id: rutgers.id,
    # },{
    #   name: "The Original Pizza City",
    #   address: "145 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.499810,
    #   longitude: -74.453430,
    #   school_id: rutgers.id,
    # },
    # Penn State
    {
      name: "Panda Express",
      address: "7 Hub Robeson Center, University Park, PA 16802",
      latitude: 40.802589,
      longitude: -77.856529,
      school_id: pennState.id,
    },{
      name: "Sbarro",
      address: "7 Hub Robeson Center, University Park, PA 16802",
      latitude: 40.802589,
      longitude: -77.856529,
      school_id: pennState.id,
    },{
      name: "McAlister's Deli",
      address: "7 Hub Robeson Center, University Park, PA 16802",
      latitude: 40.802589,
      longitude: -77.856529,
      school_id: pennState.id,
    },{
      name: "HUB Dining - Soup and Garden",
      address: "7 Hub Robeson Center, University Park, PA 16802",
      latitude: 40.802589,
      longitude: -77.856529,
      school_id: pennState.id,
    },{
      name: "The Tavern",
      address: "220 E College Ave, State College, PA 16801",
      latitude: 40.795540,
      longitude: -77.860020,
      school_id: pennState.id,
    },{
      name: "Chopstick Express",
      address: "134 E College Ave, State College, PA 16801",
      latitude: 40.794950,
      longitude: -77.860420,
      school_id: pennState.id,
    },{
      name: "Queenstown Restaurant",
      address: "142 E College Ave, State College, PA 16801",
      latitude: 40.795140,
      longitude: -77.856529,
      school_id: pennState.id,
    },{
      name: "Chick2",
      address: "128 E College Ave, State College, PA 16801",
      latitude: 40.794811,
      longitude: -77.860558,
      school_id: pennState.id,
    },{
      name: "Sadie's Gourmet Waffles & Smokey Joe's Sandwiches",
      address: "118 S Pugh St, State College, PA 16801",
      latitude: 40.794900,
      longitude: -77.860100,
      school_id: pennState.id,
    },{
      name: "Irvings Bagels",
      address: "110 E College Ave #4816, State College, PA 16801",
      latitude: 40.794560,
      longitude: -77.861210,
      school_id: pennState.id,
    },{
      name: "Underground",
      address: "218 E Calder Way, State College, PA 16801",
      latitude: 40.795140,
      longitude: -77.859360,
      school_id: pennState.id,
    },{
      name: "Yallah Taco",
      address: "217 McAllister Alley, State College, PA 16801",
      latitude: 40.795220,
      longitude: -77.859070,
      school_id: pennState.id,
    },{
      name: "India Pavilion",
      address: "222 E Calder Way, State College, PA 16801",
      latitude: 40.795380,
      longitude: -77.859080,
      school_id: pennState.id,
    },{
      name: "College Pizza",
      address: "128 Locust Ln, State College, PA 16801",
      latitude: 40.795900,
      longitude: -77.857910,
      school_id: pennState.id,
    },{
      name: "The Koop",
      address: "129 Locust Ln, State College, PA 16801",
      latitude: 40.796100,
      longitude: -77.857760,
      school_id: pennState.id,
    },{
      name: "Latinos Food",
      address: "324 E Calder Way, State College, PA 16801",
      latitude: 40.796680,
      longitude: -77.857450,
      school_id: pennState.id,
    },
    {
      name: "Primanti Bros.",
      address: "130 Heister St, State College, PA 16801",
      latitude: 40.796700,
      longitude: -77.856880,
      school_id: pennState.id,
    },{
      name: "Bagel Crust",
      address: "332 E Calder Way, State College, PA 16801",
      latitude: 40.796780,
      longitude: -77.857310,
      school_id: pennState.id,
    },{
      name: "Yum Cafe",
      address: "320 E Calder Way, State College, PA 16801",
      latitude: 40.796630,
      longitude: -77.857510,
      school_id: pennState.id,
    },{
      name: "The Waffle Shop",
      address: "364 E College Ave, State College, PA 16801",
      latitude: 40.797700,
      longitude: -77.856930,
      school_id: pennState.id,
    },{
      name: "Deli and Z Bar",
      address: "113 Heister St, State College, PA 16801",
      latitude: 40.797250,
      longitude: -77.857090,
      school_id: pennState.id,
    },{
      name: "Baby's Burgers and Shakes",
      address: "131 S Garner St, State College, PA 16801",
      latitude: 40.797580,
      longitude: -77.856270,
      school_id: pennState.id,
    },{
      name: "Happy Buns",
      address: "426 E College Ave, State College, PA 16801",
      latitude: 40.798130,
      longitude: -77.856510,
      school_id: pennState.id,
    },{
      name: "Jimmy John's",
      address: "434 E College Ave, State College, PA 16801",
      latitude: 40.798340,
      longitude: -77.856170,
      school_id: pennState.id,
    },{
      name: "Big Bowl Noodle House",
      address: "418 E College Ave, State College, PA 16801",
      latitude: 40.798010,
      longitude: -77.856480,
      school_id: pennState.id,
    },{
      name: "Tommy's Asian Grill",
      address: "432 E College Ave, State College, PA 16801",
      latitude: 40.798040,
      longitude: -77.856290,
      school_id: pennState.id,
    },{
      name: "Are U Hungry",
      address: "111 Sowers St, State College, PA 16801",
      latitude: 40.798280,
      longitude: -77.855530,
      school_id: pennState.id,
    },{
      name: "Yallah Burrito",
      address: "404 E Calder Way, State College, PA 16801",
      latitude: 40.797510,
      longitude: -77.855860,
      school_id: pennState.id,
    },{
      name: "D. P. Dough",
      address: "401 E Beaver Ave, State College, PA 16801",
      latitude: 40.797140,
      longitude: -77.855640,
      school_id: pennState.id,
    },{
      name: "Uncle Chen's",
      address: "430 E Calder Way, State College, PA 16801",
      latitude: 40.797610,
      longitude: -77.855170,
      school_id: pennState.id,
    },{
      name: "Zen Wings and Things",
      address: "433 E Beaver Ave, State College, PA 16801",
      latitude: 40.797510,
      longitude: -77.855080,
      school_id: pennState.id,
    },{
      name: "Beijing Restaurant",
      address: "452 E College Ave, State College, PA 16801",
      latitude: 40.798740,
      longitude: -77.855610,
      school_id: pennState.id,
    },{
      name: "Osaka",
      address: "450 E College Ave, State College, PA 16801",
      latitude: 40.798830,
      longitude: -77.855600,
      school_id: pennState.id,
    },{
      name: "Galanga by Cozy Thai",
      address: "454 E College Ave, State College, PA 16801",
      latitude: 40.798890,
      longitude: -77.855490,
      school_id: pennState.id,
    },{
      name: "Pizza Mia",
      address: "114 Hetzel St, State College, PA 16801",
      latitude: 40.799030,
      longitude: -77.854700,
      school_id: pennState.id,
    },{
      name: "Playa Bowl",
      address: "482 E Calder Way, State College, PA 16801",
      latitude: 40.798770,
      longitude: -77.854350,
      school_id: pennState.id,
    },{
      name: "Kaarma Indian Cuisine",
      address: "120 E Beaver Ave, State College, PA 16801",
      latitude: 40.793700,
      longitude: -77.859500,
      school_id: pennState.id,
    },{
      name: "Mad Mex",
      address: "240 S Pugh St, State College, PA 16801",
      latitude: 40.793640,
      longitude: -77.858710,
      school_id: pennState.id,
    },{
      name: "Gumby's Pizza",
      address: "300 S Pugh St Suite 101, State College, PA 16801",
      latitude: 40.793070,
      longitude: -77.857190,
      school_id: pennState.id,
    },{
      name: "Korean Table",
      address: "310 S Allen St, State College, PA 16801",
      latitude: 40.791930,
      longitude: -77.858500,
      school_id: pennState.id,
    },{
      name: "Cozy Thai Bistro",
      address: "232 S Allen St, State College, PA 16801",
      latitude: 40.792710,
      longitude: -77.859510,
      school_id: pennState.id,
    },{
      name: "John's Shanghai",
      address: "312 W Beaver Ave, State College, PA 16801",
      latitude: 40.791060,
      longitude: -77.862930,
      school_id: pennState.id,
    },{
      name: "Doan's Bones",
      address: "401 W Beaver Ave, State College, PA 16801",
      latitude: 40.790780,
      longitude: -77.864070,
      school_id: pennState.id,
    },{
      name: "Tadashi Japanese Restaurant",
      address: "206 W College Ave, State College, PA 16801",
      latitude: 40.793220,
      longitude: -77.862680,
      school_id: pennState.id,
    },{
      name: "Little Szechuan",
      address: "228 W College Ave, State College, PA 16801",
      latitude: 40.792720,
      longitude: -77.863300,
      school_id: pennState.id,
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
  meals_for_today = []
  meals_for_tomorrow = []

  shops = Shop.all

  # (shops.length).times do |i|
  #   name = Faker::Food.dish

  #   description = ''
  #   4.times do |j|
  #     description += Faker::Food.ingredient + ", "
  #   end
  #   description += Faker::Food.ingredient

  #   price = rand(3.0..8.0).round(2)

  #   randomNumber = rand(1..200)
  #   image_url = "https://source.unsplash.com/collection/#{collectionID}/#{imageWidth}x#{imageHeight}/?sig=#{randomNumber}"

  #   shop_id = shops[i].id

  #   meals << {
  #     name: name,
  #     description: description,
  #     price: price,
  #     image_url: image_url,
  #     shop_id: shop_id
  #   }
  # end

  shops.each do |shop|
    name = 'Burger with Fries'
    description = "Beef patty, cheese, bun, lettus, onion, tomato, potato"
    price = 8.99
    image_url = "https://source.unsplash.com/collection/#{collectionID}/#{imageWidth}x#{imageHeight}/?sig=#{rand(1..200)}"
    shop_id = shop.id

    meals_for_today << {
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      shop_id: shop_id
    }
  end

  shops.each do |shop|
    name = 'Fried Chicken Sandwich'
    description = "Chicken, breading, coleslaw, bun"
    price = 9.99
    image_url = "https://source.unsplash.com/collection/#{collectionID}/#{imageWidth}x#{imageHeight}/?sig=#{rand(1..200)}"
    shop_id = shop.id

    meals_for_today << {
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      shop_id: shop_id
    }
  end

  shops.each do |shop|
    name = 'Pizza'
    description = "Pizza dough, mozzarella cheese, tomato sauce"
    price = 7.99
    image_url = "https://source.unsplash.com/collection/#{collectionID}/#{imageWidth}x#{imageHeight}/?sig=#{rand(1..200)}"
    shop_id = shop.id

    meals_for_tomorrow << {
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      shop_id: shop_id
    }
  end

  meals_for_today.each do |meal|
    Meal.create!(meal)
  end
  
  puts "Meals for today created"

  meals_for_tomorrow.each do |meal|
    Meal.create!(meal)
  end
  
  puts "Meals for tomorrow created"

end

ActiveRecord::Base.transaction do
  Menu.destroy_all

  # Today's LUNCH menu
  meals_for_today_lunch = Meal.where(name: "Burger with Fries")
  today = Date.today

  meals_for_today_lunch.each do |meal|
    Menu.create!({meal_id: meal.id, offered_date: today, lunch: true, dinner: false})
  end

  puts "Menu for TODAY LUNCH created"

  # Today's DINNER menu
  meals_for_today_dinner = Meal.where(name: "Fried Chicken Sandwich")

  meals_for_today_dinner.each do |meal|
    Menu.create!({meal_id: meal.id, offered_date: today, lunch: false, dinner: true})
  end

  puts "Menu for TODAY DINNER created"

  # Tomorrow's menu
  meals_for_tomorrow = Meal.where(name: "Pizza")
  tomorrow = Date.today + 1

  meals_for_tomorrow.each do |meal|
    Menu.create!({meal_id: meal.id, offered_date: tomorrow})
  end

  puts "Menu for TOMORROW created"
end

ActiveRecord::Base.transaction do
  Favorite.destroy_all
  rutgers = User.find_by(email: 'rutgers@gmail.com')
  shops = Shop.all

  shops.each do |s|
    if (rand(1..10) < 4)
      Favorite.create!({shop_id: s.id, user_id: rutgers.id})
    end
  end
  puts "Favorites created"
end

ActiveRecord::Base.transaction do
  Reservation.destroy_all
  rutgers = User.find_by(email: 'rutgers@gmail.com')
  menus = Menu.all

  times = ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30']
  date = Date.today + 1

  20.times do |t|
    if (rand(1..10) < 7)
      menu_id = menus.sample.id
      time = (date.to_s + " " + times.sample).to_time
      Reservation.create!({menu_id: menu_id, user_id: rutgers.id, time: time, date: date})
    end
    date = date - 1
  end

  puts "Reservations created"
end
