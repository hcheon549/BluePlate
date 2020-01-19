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
    ################################################
    ##############  SEMESTER CYCLE  ################
    ################################################
    {
      name: "12 Meals",  ##### $4.99 per meal
      plan_type: "semester",
      meals: 180,
      price: 898.20
    },
    {
      name: "8 Meals", ##### $5.49 per meal
      plan_type: "semester",
      meals: 120,
      price: 658.80
    },
    {
      name: "4 Meals",  ##### $5.99 per meal
      plan_type: "semester",
      meals: 60,
      price: 359.40
    },
    ################################################
    ###############  4-WEEKS CYCLE  ################
    ################################################
    {
      name: "12 Meals",  ##### $5.99 per meal
      plan_type: "4weeks",
      meals: 48,
      price: 287.52
    },
    {
      name: "9 Meals", ##### $6.39 per meal
      plan_type: "4weeks",
      meals: 36,
      price: 230.04
    },
    {
      name: "6 Meals", ##### $6.69 per meal
      plan_type: "4weeks",
      meals: 24,
      price: 160.56
    },
    {
      name: "3 Meals",  ##### $6.99 per meal
      plan_type: "4weeks",
      meals: 12,
      price: 83.88
    },
    ################################################
    ###############  2-WEEKS TRIAL  ################
    ################################################
    {
      name: "12 Meals",  ##### $4.99 per meal
      plan_type: "2weeks",
      meals: 24,
      price: 119.76
    },
    {
      name: "8 Meals", ##### $5.49 per meal
      plan_type: "2weeks",
      meals: 16,
      price: 87.84
    },
    {
      name: "4 Meals",  ##### $5.99 per meal
      plan_type: "2weeks",
      meals: 8,
      price: 47.92
    },
    ################################################
    ###############       TEST      ################
    ################################################
    {
      name: "1 Meals",  ##### $0.99 per meal
      plan_type: "test",
      meals: 1,
      price: 0.99
    },
    {
      name: "1 Meals",  ##### $0.99 per meal
      plan_type: "test",
      meals: 2,
      price: 1.98
    },
    {
      name: "1 Meals",  ##### $0.99 per meal
      plan_type: "test",
      meals: 3,
      price: 2.97
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
  Promo.destroy_all

  promos = [
    { code: 'BLUEPLATTR15', description: '$15 Off on Any Plans', adjustment_type: 'Fixed', adjustment_value: -15, quantity: 1000000, active: 1, total_redeemed: 0 },
    { code: 'EARLYBIRD', description: '$25 Off on Any Plans', adjustment_type: 'Fixed', adjustment_value: -25, quantity: 20, active: 1, total_redeemed: 0 }
  ]

  promos.each do |promo|
    Promo.create!(promo)
  end
  puts "Promo Codes created"
end
  
ActiveRecord::Base.transaction do
  User.destroy_all

  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  # pennState = School.find_by(name: "Pennsylvania State University–University Park")

  users = [
    {
      email: 'eric@blueplattr.com',
      password: 'ececec',
      fname: 'BluePlattr',
      lname: 'Demo',
      school_id: rutgers.id
    }
  ]

  users.each do |user|
    User.create!(user)
  end
  puts "Users created"
end

ActiveRecord::Base.transaction do
  Subscription.destroy_all

  rutgers = User.find_by(email: 'eric@blueplattr.com')
  plans = Plan.all
  rutgers_plan = plans[rand(0..plans.length-1)]

  subscriptions = [
    {
      user_id: rutgers.id,
      plan_id: rutgers_plan.id,
      meal_credit: rutgers_plan.meals,
      subscription_start: Date.new(2020, 1, 22),
      subscription_end: Date.new(2020, 5, 13)
    }
    # ,{
    #   user_id: penn.id,
    #   plan_id: penn_plan.id,
    #   meal_credit: penn_plan.meals,
    #   subscription_start: Date.new(2020, 1, 22),
    #   subscription_end: Date.new(2020, 5, 13)
    # },
  ]

  subscriptions.each do |subscription|
    Subscription.create!(subscription)
  end
  puts "Subscriptions created"
end

ActiveRecord::Base.transaction do
  AccountSummary.destroy_all

  rutgers = User.find_by(email: 'eric@blueplattr.com')
  memberPolicy = Policy.find_by(policy_type: 'Member')

  summaries = [
    {
      user_id: rutgers.id,
      subscription_id: rutgers.subscription.id,
      policy_id: memberPolicy.id,
      total_meal_credits: rutgers.subscription.meal_credit,
      meal_credits_left: rutgers.subscription.meal_credit
    }
    # ,{
    #   user_id: penn.id,
    #   subscription_id: penn.subscription.id,
    #   policy_id: memberPolicy.id,
    #   total_meal_credits: penn.subscription.meal_credit,
    #   meal_credits_left: penn.subscription.meal_credit
    # },
  ]

  summaries.each do |summary|
    AccountSummary.create!(summary)
  end
  puts "AccountSummary created"
end


ActiveRecord::Base.transaction do
  Shop.destroy_all

  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  # pennState = School.find_by(name: "Pennsylvania State University–University Park")

  shops = [
    {
      name: "Bagel Nosh",
      address: "357 George St, New Brunswick, NJ 08901",
      latitude: 40.494869,
      longitude: -74.443459,
      school_id: rutgers.id,
    },{
      name: "KBG Korean BBQ & Grill",
      address: "6 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.496862, 
      longitude: -74.447166,
      school_id: rutgers.id,
    },{
      name: "Knights Express Pizza & Grill",
      address: "43A Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.49795,
      longitude: -74.44853,
      school_id: rutgers.id,
    },{
      name: "25 Burgers",
      address: "4A Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.496575, 
      longitude: -74.446986,
      school_id: rutgers.id,
    },{
      name: "25 Burgers & Pizza",
      address: "4B Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.496741, 
      longitude: -74.447003,
      school_id: rutgers.id,
    },{
      name: "Kam Fung",
      address: "210 Hamilton St, New Brunswick, NJ 08901",
      latitude: 40.496689,
      longitude: -74.454269,
      school_id: rutgers.id,
    },{
      name: "Campus Pizza",
      address: "160 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.49958,
      longitude: -74.454071,
      school_id: rutgers.id,
    },{
      name: "Jersey Mike's Subs",
      address: "44 College Ave, New Brunswick, NJ 08901",
      latitude: 40.499365, 
      longitude: -74.448818,
      school_id: rutgers.id,
    },{
      name: "The Halal Guys",
      address: "37 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.49789,
      longitude: -74.44839,
      school_id: rutgers.id,
    },{
      name: "Elevation Burger",
      address: "48 College Ave, New Brunswick, NJ 08901",
      latitude: 40.499449,
      longitude: -74.448693,
      school_id: rutgers.id,
    },{
      name: "Knight's Deli",
      address: "202 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.5003,
      longitude: -74.45591,
      school_id: rutgers.id,
    },{
      name: "Douglas Pizza & Grill",
      address: "298 George St, New Brunswick, NJ 08901",
      latitude: 40.492081,
      longitude: -74.443298,
      school_id: rutgers.id,
    },{
      name: "Deli Plaza",
      address: "3 Elm Row, New Brunswick, NJ 08901",
      latitude: 40.49426,
      longitude: -74.44497,
      school_id: rutgers.id,
    },{
      name: "Jersey Subs",
      address: "380 George St, New Brunswick, NJ 08901",
      latitude: 40.49574,
      longitude: -74.44429,
      school_id: rutgers.id,
    },{
      name: "Cambo Box",
      address: "342 George St, New Brunswick, NJ 08901",
      latitude: 40.49409,
      longitude: -74.44404,
      school_id: rutgers.id,
    },{
      name: "Giovanneli's Pizza & Grill",
      address: "60 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.49783,
      longitude: -74.44938,
      school_id: rutgers.id,
    },{
      name: "Nuebies Pizza",
      address: "138 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.49926,
      longitude: -74.45317,
      school_id: rutgers.id,
    },{
      name: "Krispy Pizza and Grill",
      address: "50 College Ave, New Brunswick, NJ 08901",
      latitude: 40.499608,
      longitude: -74.448520,
      school_id: rutgers.id,
    },{
      name: "Popeyes Louisiana Kitchen",
      address: "375 George St, New Brunswick, NJ 08901",
      latitude: 40.49559,
      longitude: -74.44359,
      school_id: rutgers.id,
    },{
      name: "Ramen Stop",
      address: "176 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.500109, 
      longitude: -74.454945,
      school_id: rutgers.id,
    }
    # ,{
    #   name: "King of Gyro",
    #   address: "105 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.49877,
    #   longitude: -74.45167,
    #   school_id: rutgers.id,
    # },{
    #   name: "R.U. Grill and Pizza",
    #   address: "142 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.49929,
    #   longitude: -74.45327,
    #   school_id: rutgers.id,
    # },{
    #   name: "Seed Burger",
    #   address: "176 Easton Ave store 1A, New Brunswick, NJ 08901",
    #   latitude: 40.500045, 
    #   longitude: -74.454799,
    #   school_id: rutgers.id,
    # }
  ]


  shops.each_with_index do |shop, i|
    Shop.create!(shop)
  end
  puts "Shops created"
end


ActiveRecord::Base.transaction do
  Meal.destroy_all

  # rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  # shops = Shop.all

  # meals_for_today = []
  # meals_for_tomorrow = []


  ###############################################
  ######## RUTGERS REAL LIFE EXAMPLES ########
  ###############################################

  # shops.each do | shop |
  #   meal = {
  #     shop_id: shop.id,
  #     name: shop.name,
  #     description: "This and that",
  #     price: 8.99,
  #     image_url: "https://blueplate-development.s3.amazonaws.com/seeds/queenstown_roast_beef_sandwich.jpeg"
  #   }
  #   Meal.create(meal)
  #   puts shop.name + " created"
  # end


  # puts "Meals Created"

end

ActiveRecord::Base.transaction do
  Menu.destroy_all
  
  # today = Date.today

  # week = []
  # 14.times do |count|
  #   week << today
  #   today += 1
  # end

  # ###############################################
  # ######## RUTGERS REAL LIFE EXAMPLES ########
  # ###############################################


  # rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  # rutgersShops = Shop.where(school_id: rutgers.id)

  # lunch_count = 0
  # dinner_count = 0

  # rutgersShops.each do |shop|
  #   week.each do |day|
  #     sample_lunch_meal = shop.meals.sample
  #     sample_dinner_meal = shop.meals.sample
  #     Menu.create!(meal_id: sample_lunch_meal.id, offered_date: day, lunch: true, dinner: false)
  #     Menu.create!(meal_id: sample_dinner_meal.id, offered_date: day, lunch: false, dinner: true)
  #     lunch_count += 1
  #     dinner_count += 1
  #   end
  # end

  # puts lunch_count.to_s + " lunch menus in Rutgers created"
  # puts dinner_count.to_s + " dinner menus in Rutgers created"


end

ActiveRecord::Base.transaction do
  Reservation.destroy_all
  # rutgers = User.find_by(email: 'eric@blueplattr.com')
  # menus = Menu.all

  # lunch_time = PickupTime.where(pickup_type: 0)
  # dinner_time = PickupTime.where(pickup_type: 1)

  # 20.times do |t|
  #   menu_id = menus.sample.id
  #   if (rand(1..10) < 6)
  #     lunch_pickup_time_id = lunch_time.sample.id
  #     Reservation.create!({ menu_id: menu_id, user_id: rutgers.id, pickup_time_id: lunch_pickup_time_id })
  #   else
  #     dinner_pickup_time_id = dinner_time.sample.id
  #     Reservation.create!({ menu_id: menu_id, user_id: rutgers.id, pickup_time_id: dinner_pickup_time_id })
  #   end
  # end

  # puts "Reservations created"
end
