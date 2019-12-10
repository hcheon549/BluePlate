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
    # ,{
    #   name: "Pennsylvania State University–University Park",
    #   latitude: 40.792650,
    #   longitude: -77.859082
    # }
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
  # pennState = School.find_by(name: "Pennsylvania State University–University Park")

  users = [
    {
      email: 'demo@gmail.com',
      password: 'ececec',
      fname: 'BluePlattr',
      lname: 'Demo',
      school_id: rutgers.id
    }
    # ,{
    #   email: 'penn@gmail.com',
    #   password: 'ececec',
    #   fname: 'Eric',
    #   lname: 'Cheon',
    #   school_id: pennState.id
    # },
  ]

  users.each do |user|
    User.create!(user)
  end
  puts "Users created"
end

ActiveRecord::Base.transaction do
  Subscription.destroy_all

  rutgers = User.find_by(email: 'demo@gmail.com')
  # penn = User.find_by(email: 'penn@gmail.com')
  plans = Plan.all
  rutgers_plan = plans[rand(0..plans.length-1)]
  # penn_plan = plans[rand(0..plans.length-1)]

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

  rutgers = User.find_by(email: 'demo@gmail.com')
  # penn = User.find_by(email: 'penn@gmail.com')

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
  ###############################################
  ######## RUTGERS REAL LIFE EXAMPLES ###########
  ###############################################
    {
      name: "Marathon Sushi",
      address: "63 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.498030,
      longitude: -74.449500,
      school_id: rutgers.id,
    },{
      name: "Queensboro Restaurant",
      address: "101 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.499020,
      longitude: -74.451320,
      school_id: rutgers.id,
    },{
      name: "Chicken2",
      address: "72 Easton Avenue New Brunswick NJ 08901",
      latitude: 40.497980,
      longitude: -74.449910,
      school_id: rutgers.id,
    },{
      name: "Eric's Gourmet Sandwich and Waffle",
      address: "90 College Ave, New Brunswick, NJ 08901",
      latitude: 40.500740,
      longitude: -74.449290,
      school_id: rutgers.id,
    },{
      name: "Namaste Pavilion",
      address: "10 College Ave, New Brunswick, NJ 08901",
      latitude: 40.498130,
      longitude: -74.447090,
      school_id: rutgers.id,
    },{
      name: "Delissimo",
      address: "45 Central Ave, New Brunswick, NJ 08901",
      latitude: 40.498210,
      longitude: -74.457090,
      school_id: rutgers.id,
    },{
      name: "Bobby's Burger",
      address: "45 Bartlett St, New Brunswick, NJ 08901",
      latitude: 40.501200,
      longitude: -74.453110,
      school_id: rutgers.id,
    },{
      name: "Mexicano Food",
      address: "31 Sicard St, New Brunswick, NJ 08901",
      latitude: 40.502708,
      longitude: -74.454468,
      school_id: rutgers.id,
    },{
      name: "Soto Wings Factory",
      address: "48 Morrell St, New Brunswick, NJ 08901",
      latitude: 40.501000,
      longitude: -74.455060,
      school_id: rutgers.id,
    },{
      name: "Mama Mia",
      address: "207 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.500340,
      longitude: -74.456000,
      school_id: rutgers.id,
    },{
      name: "Grubhub's Pizza",
      address: "230 Easton Ave New Brunswick, NJ 08901",
      latitude: 40.499930,
      longitude: -74.454930,
      school_id: rutgers.id,
    },{
      name: "Hon Sushi",
      address: "120 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.499780,
      longitude: -74.454630,
      school_id: rutgers.id,
    },{
      name: "Seoul Sang",
      address: "130 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.499460,
      longitude: -74.453740,
      school_id: rutgers.id,
    },{
      name: "Uncle Sam's",
      address: "530 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.499810,
      longitude: -74.453430,
      school_id: rutgers.id,
    },{
      name: "The Noodle Associates", #####
      address: "128 College Ave, New Brunswick, NJ 08901",
      latitude: 40.502209,
      longitude: -74.451950,
      school_id: rutgers.id,
    },{
      name: "Minetta Taverna", ## check
      address: "149 College Ave, New Brunswick, NJ 08901",
      latitude: 40.503210,
      longitude: -74.451970,
      school_id: rutgers.id,
    },{
      name: "Kyrie's Bagel", #### Check
      address: "208 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.500340,
      longitude: -74.456001,
      school_id: rutgers.id,
    },{
      name: "Yahoo Taco",  ###check
      address: "201 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.500620,
      longitude: -74.455520,
      school_id: rutgers.id,
    },{
      name: "Checker Waffle", # wip
      address: "33 College Ave, New Brunswick, NJ 08901",
      latitude: 40.499290,
      longitude: -74.448380,
      school_id: rutgers.id,
    },{
      name: "Mama John's", ## check
      address: "98 Hamilton St, New Brunswick, NJ 08901",
      latitude: 40.499330,
      longitude: -74.448490,
      school_id: rutgers.id,
    },{
      name: "Eric's Asian Fushion", # wip
      address: "55 Mine St, New Brunswick, NJ 08901",
      latitude: 40.499350,
      longitude: -74.451780,
      school_id: rutgers.id,
    },{
      name: "The Kook", #### check
      address: "379 George St, New Brunswick, NJ 08901",
      latitude: 40.495380,
      longitude: -74.443817,
      school_id: rutgers.id,
    },{
      name: "Warner Bros.", ##
      address: "45 Bayard St, New Brunswick, NJ 08901",
      latitude: 40.494560,
      longitude: -74.444620,
      school_id: rutgers.id,
    },{
      name: "Bagel Crust", ### check
      address: "276 George St, New Brunswick, NJ 08901",
      latitude: 40.495670,
      longitude: -74.444290,
      school_id: rutgers.id,
    },{
      name: "Yummy Cafe",  ### check
      address: "355 George St, New Brunswick, NJ 08901",
      latitude: 40.494870,
      longitude: -74.443460,
      school_id: rutgers.id,
    },{
      name: "Am I Hungry", ##### check
      address: "354 George St, New Brunswick, NJ 08901",
      latitude: 40.494850,
      longitude: -74.443790,
      school_id: rutgers.id,
    },{
      name: "Yahoo Burrito", ## check
      address: "349 George St, New Brunswick, NJ 08901",
      latitude: 40.494640,
      longitude: -74.443480,
      school_id: rutgers.id,
    },{
      name: "Hiroshima", ##
      address: "333 George St, New Brunswick, NJ 08901",
      latitude: 40.494410,
      longitude: -74.443160,
      school_id: rutgers.id,
    },{
      name: "Kumar Indian Cuisine", ##
      address: "208 Hamilton St, New Brunswick, NJ 08901",
      latitude: 40.496690,
      longitude: -74.454270,
      school_id: rutgers.id,
    },{
      name: "Joe's Shanghai", ##
      address: "170 Hamilton St, New Brunswick, NJ 08901",
      latitude: 40.497430,
      longitude: -74.452140,
      school_id: rutgers.id,
    },{
      name: "Eric's Bones", ## check
      address: "296 George St, New Brunswick, NJ 08901",
      latitude: 40.492080,
      longitude: -74.443300,
      school_id: rutgers.id,
    }
  ]


  shops.each_with_index do |shop, i|
    Shop.create!(shop)
  end
  puts "Shops created"
end


ActiveRecord::Base.transaction do
  Meal.destroy_all

  imageWidth = 480
  imageHeight = 480
  collectionID = 8746283
  meals_for_today = []
  meals_for_tomorrow = []

  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  # pennState = School.find_by(name: "Pennsylvania State University–University Park")


  ###############################################
  ######## RUTGERS REAL LIFE EXAMPLES ########
  ###############################################

  chopstick = Shop.find_by(name: "Marathon Sushi")
  chopstickMeals = [
    {
      name: '2 Tuna Roll',
      description: "Tuna, rice, vinegrette, seaweed, sesame seeds",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/chopstick_express_tuna_roll.jpeg',
      shop_id: chopstick.id
    }, {
      name: 'Beef Udon',
      description: "Beef, flour noodle, beef broth, bakchoy, beansprouts",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/chopstick_express_beef_udon.jpeg',
      shop_id: chopstick.id
    }, {
      name: 'Pad Thai',
      description: "Eggs, rice noodle, soy sauce, sallion, peanut",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/chopstick_express_pad_thai.jpeg',
      shop_id: chopstick.id
    }
  ]

  chopstickMeals.each do |meal|
    Meal.create!(meal)
  end

  puts "chopstickMeals Meal Created"


  queenstown = Shop.find_by(name: "Queensboro Restaurant")
  queenstownmeal = [
    {
      name: 'Pork Chop',
      description: "Pork, amazing sauce, grilled, mashed potato",
      price: 14.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/queenstown_pork_chop.jpeg',
      shop_id: queenstown.id
    },{
      name: 'Roast Beef Sandwich',
      description: "Roast beef, bread, mustard, lettus, tomato, red onion",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/queenstown_roast_beef_sandwich.jpeg',
      shop_id: queenstown.id
    }
  ]

  queenstownmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "queenstownmeal Meal Created"

  chick2 = Shop.find_by(name: "Chicken2")
  chick2meal = [
    {
      name: 'Chicken Tender with Chips',
      description: "Fried chicken breast, potato chips, mustard sacue",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/chick2_chicken_tender_chips.jpeg',
      shop_id: chick2.id
    }, {
      name: 'Fried Chicken Sandwich with Fries',
      description: "Fried chicken breast, bun, coleslaw, french fries",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/chick2_fried_chicken_fries.jpeg',
      shop_id: chick2.id
    }, {
      name: 'Chicken Nuggets with Fries',
      description: "Chicken nuggets 4 peices, french fries, ketchup",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/chick2_chicken_nuggets.jpeg',
      shop_id: chick2.id
    }
  ]

  chick2meal.each do |meal|
    Meal.create!(meal)
  end

  puts "chick2meal Meal Created"

  saddies = Shop.find_by(name: "Eric's Gourmet Sandwich and Waffle")
  saddiesmeal = [
    {
      name: 'Two Waffle',
      description: "Waffle, syrup, strawberries",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/saddies_gourmet_two_waffles.jpeg',
      shop_id: saddies.id
    },{
      name: 'Waffle Chicken',
      description: "Fried chicken, waffles, syrup, butter",
      price: 14.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/saddies_gourmet_waffle_chicken.jpeg',
      shop_id: saddies.id
    }
  ]

  saddiesmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "saddiesmeal Meal Created"

  india = Shop.find_by(name: "Namaste Pavilion")
  indiameal = [
    {
      name: 'Bean Curry',
      description: "Beans, curry powder, vegitable broth",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/india_pavilion_bean_curry.jpeg',
      shop_id: india.id
    },{
      name: 'Chicken Curry',
      description: "Chicken, curry powder, chicken broth",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/india_pavilion_chicken_curry.jpeg',
      shop_id: india.id
    }
  ]

  indiameal.each do |meal|
    Meal.create!(meal)
  end

  puts "indiameal Meal Created"


  deliz = Shop.find_by(name: "Delissimo")
  delizmeal = [
    {
      name: 'Sandwich with French Fries',
      description: "Bread, beef, lettus, tomato, onion, potato fries, ketchup",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/deli_z_sandwich_fries.jpeg',
      shop_id: deliz.id
    },{
      name: 'Turkey Bacon Sandwich',
      description: "Turkey, bacon, bread, lettus, tomato, onion, mayo",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/deli_z_turkey_bacon_sandwich.jpeg',
      shop_id: deliz.id
    }
  ]

  delizmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "delizmeal Meal Created"


  babysburger = Shop.find_by(name: "Bobby's Burger")
  babysmeal = [
    {
      name: 'Bacon Cheese Burger',
      description: "Beef patty, buns, lettus, tomato, onion, bacon, american cheese",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/babys_burger_bacon_burger.jpeg',
      shop_id: babysburger.id
    },{
      name: 'Fried Chicken Sandwich',
      description: "Fried chicken, bun, coleslaw, mayo",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/babys_burger_fried_chicken_sandwich.jpeg',
      shop_id: babysburger.id
    },{
      name: 'Glazed Salmon',
      description: "Glazed Salmon, risotto, fish broth",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/babys_burger_glazed_salmon.jpeg',
      shop_id: babysburger.id
    }
  ]

  babysmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "babysmeal Meal Created"

  tommys = Shop.find_by(name: "Eric's Asian Fushion")
  tommysmeal = [
    {
      name: 'Kalbi Platter',
      description: "Short rib, soy sauce, sesame oil, scallion, rice",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/tommys_asian_kalbi.jpeg',
      shop_id: tommys.id
    }
  ]

  tommysmeal.each do |meal|
    Meal.create!(meal)
  end

  puts  "tommysmeal Meal Created"


  unclechen = Shop.find_by(name: "Uncle Sam's")
  unclemeal = [
    {
      name: 'Spicy Ramen',
      description: "Ramen noodle, spicy pepper flakes, vegitable broth",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/uncle_chen_spicy_ramen.jpeg',
      shop_id:  unclechen.id
    }, {
      name: 'Vegitable Noodle',
      description: "Udon noodle, assorted vegitables",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/uncle_chen_vegi_noodle.jpeg',
      shop_id:  unclechen.id
    }
  ]

  unclemeal.each do |meal|
    Meal.create!(meal)
  end

  puts  "unclemeal Meal Created"

  doans = Shop.find_by(name: "Eric's Bones")
  doansmeal = [
    {
      name: 'Salmon Burger with Fries',
      description: "Salmon, bun, ketchup, french fries",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/doans_bone_salmon_burger.jpeg',
      shop_id:  doans.id
    }, {
      name: 'Hamburger',
      description: "Beef patty, american cheese, buns, lettus, tomato",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/doans_bones_hamburger.jpeg',
      shop_id:  doans.id
    }
  ]

  doansmeal.each do |meal|
    Meal.create!(meal)
  end

  puts  "doansmeal Meal Created"

  bigbowl = Shop.find_by(name: "The Noodle Associates")
  bigbowlmeal = [
    {
      name: 'Shrimp Ramen',
      description: "Shrimp, vegitables, ramen noodle, seafood broth",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/big_bowl_shrimp_ramen.jpeg',
      shop_id: bigbowl.id
    }, {
      name: 'Tonkotsu Ramen',
      description: "Grilled pork belly, pork broth, ramen noodle, vegitables",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/big_bowl_tonkotsu_ramen.jpeg',
      shop_id: bigbowl.id
    }, {
      name: 'Yakisoba',
      description: "Stir fried udon noodle, vegitables, soy sauce, chicken",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/big_bowl_yakisoba.jpeg',
      shop_id: bigbowl.id
    }
  ]

  bigbowlmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "bigbowlmeal Meal Created"


  gumbys = Shop.find_by(name: "Grubhub's Pizza")
  gumbysmeal = [
    {
      name: '2 Ham Pizza',
      description: "Pizza dough, tomato sauce, cheese, ham",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/gumbys_pizza_ham_pizza.jpeg',
      shop_id: gumbys.id
    },{
      name: '3 Pepperoni_pizza',
      description: "Pizza dough, tomato sauce, cheese, pepperoni",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/gumbys_pizza_pepperoni_pizza.jpeg',
      shop_id: gumbys.id
    },{
      name: 'Supreme Pizza',
      description: "Pizza dough, tomato sauce, cheese, ham, pepperoni, peppers",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/gumbys_pizza_supreme_pizza.jpeg',
      shop_id: gumbys.id
    },{
      name: '2 Margharita Pizza',
      description: "Pizza dough, tomato sauce, cheese, olive oil",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/gumbys_pizza_margharita_pizza.jpeg',
      shop_id: gumbys.id
    }
  ]

  gumbysmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "gumbysmeal Meal Created"

  irving = Shop.find_by(name: "Kyrie's Bagel")
  irvingmeal = [
    {
      name: 'Italian Sandwich',
      description: "Bread, pepperoni, salami, ham, mustard, lettus",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/irvings_bagel_italian_sandwich.jpeg',
      shop_id: irving.id
    },{
      name: 'Avocado Bagel',
      description: "Avocado, greens, bagel, sesame seeds",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/irvings_bagels_avocado_bagel.jpeg',
      shop_id: irving.id
    },{
      name: 'Tuna Bagel',
      description: "Tuna, bagel",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/irvings_bagels_tuna_bagel.jpeg',
      shop_id: irving.id
    },{
      name: 'Roast Beef Sandwich',
      description: "Roast beef, aruguala, mayo, tomato, bread",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/irvings_bagles_roast_beef_sandwich.jpeg',
      shop_id: irving.id
    }
  ]

  irvingmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "irvingmeal Meal Created"

  crust = Shop.find_by(name: "Bagel Crust")
  crustmeal = [
    {
      name: 'Bagel with Cream Cheese',
      description: "Bagel, toasted with cream cheese",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/bagel_crust_bagel_creamcheese.jpeg',
      shop_id: crust.id
    },{
      name: 'Loaded Bagel',
      description: "Bagel, loaded meat, vegitables, cream cheese",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/bagel_crust_loaded_bagel.jpeg',
      shop_id: crust.id
    },{
      name: 'Mexican Bagel',
      description: "Bagel, guacamole, sour cream, tomato, pico de gallo",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/bagel_crust_mexican_bagel.jpeg',
      shop_id: crust.id
    }
  ]

  crustmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "crustmeal Meal Created"

  hungry = Shop.find_by(name: "Am I Hungry")
  hungrymeal = [
    {
      name: 'Chicken Sandwich',
      description: "Chicken thigh grilled, white bread, aruguala, mayo, tomato",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/ru_hungry_chicken_sandwich.jpeg',
      shop_id: hungry.id
    }, {
      name: 'Ham Sandwich',
      description: "Roasted ham, rye bread, lettus, swiss cheese, mayo",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/ru_hungry_ham_sandwich.jpeg',
      shop_id: hungry.id
    }, {
      name: 'Salami Sandwich',
      description: "Salami, bread, mayo, aruguala",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/ru_hungry_salami_sandwich.jpeg',
      shop_id: hungry.id
    }
  ]

  hungrymeal.each do |meal|
    Meal.create!(meal)
  end

  puts "hungrymeal Meal Created"
  
  zen = Shop.find_by(name: "Soto Wings Factory")
  zenmeal = [
    {
      name: 'Garden Salad',
      description: "Greens, tomato, egg, salad dressing",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/zen_garden_salad.jpeg',
      shop_id: zen.id
    },{
      name: 'Ham Sadnwich',
      description: "Ham, cheese, bread, mustard, aruguala",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/zen_ham_sandwich.jpeg',
      shop_id: zen.id
    },{
      name: 'Turkey Sandwich',
      description: "Turkey, bread, swiss cheese, mustard, aruguala",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/zen_turkey_sandwich.jpeg',
      shop_id: zen.id
    }
  ]

  zenmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "zenmeal Meal Created"
  
  yallahtaco = Shop.find_by(name: "Yahoo Taco")
  yallahtacomeal = [
    {
      name: 'Breakfast Burrito',
      description: "Eggs, Sausages, wrap, mexican sauce",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yallah_taco_breakfast_burrito.jpeg',
      shop_id: yallahtaco.id
    },{
      name: 'Grilled Cheese Sandwich',
      description: "White bread, swiss cheese, american cheese, mozzarella cheese",
      price: 8.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yallah_taco_grilled_cheese_sandwich.jpeg',
      shop_id: yallahtaco.id
    },{
      name: 'Nachos',
      description: "Loaded nachos, melted cheese, blue cheese, sour cream, bacons, scallion",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yallah_taco_nachos.jpeg',
      shop_id: yallahtaco.id
    }
  ]

  yallahtacomeal.each do |meal|
    Meal.create!(meal)
  end

  puts "yallahtacomeal Meal Created"


  kook = Shop.find_by(name: "The Kook")
  kookmeal = [
    {
      name: 'Chicken Ramen',
      description: "Chicken, wheat noodle, chicken broth, beansprouts, scaliions",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_koop_chicken_ramen.jpeg',
      shop_id: kook.id
    }, {
      name: '3 Dumplings',
      description: "Beef, vegitables, flour, soy sauce",
      price: 7.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_koop_dumpling.jpeg',
      shop_id: kook.id
    }, {
      name: 'Orange Chicken',
      description: "Deep fried chicken, peppers, orange sauce",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_koop_orange_chicken.jpeg',
      shop_id: kook.id
    }, {
      name: 'Sushi Platter',
      description: "Assorted fish, rice, vinegrette, wasabi, seaweeds",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_koop_sushi.jpeg',
      shop_id: kook.id
    }
  ]

  kookmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "kookmeal Meal Created"

  jimmy = Shop.find_by(name: "Mama John's")
  jimmymeal = [
    {
      name: 'Chicken Sandwich with Fries',
      description: "Chicken, breading, coleslaw, potato fries, bread",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/jimmy_johns_chicken_sandwich_fries.jpeg',
      shop_id: jimmy.id
    },{
      name: 'Turkey Sandwich',
      description: "Turkey, bread, lettus, tomato, onion, mayo",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/jimmy_johns_turkey_sandwich.jpeg',
      shop_id: jimmy.id
    }
  ]
  jimmymeal.each do |meal|
    Meal.create!(meal)
  end

  puts "jimmymeal Meal Created"


  joes = Shop.find_by(name: "Joe's Shanghai")
  joesmeal = [
    {
      name: 'Beef Roll',
      description: "Beef, flour wrap, lettus, dressing",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/joes_shanghai_beef_roll.jpeg',
      shop_id: joes.id
    },{
      name: 'Seafood Noodle Soup',
      description: "Assorted seafood, soup, vegitables, onions, peppers",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/joes_shanghai_seafood_noodle_soup.jpeg',
      shop_id: joes.id
    }
  ]
  joesmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "joesmeal Meal Created"

  kaarma = Shop.find_by(name: "Kumar Indian Cuisine")
  kaarmameal = [
    {
      name: 'Chicken Satay',
      description: "Chicken, curry seasoning, grilled",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/kaarma_indian_chicken_satay.jpeg',
      shop_id: kaarma.id
    },{
      name: 'Curry',
      description: "Curry powder, rice, vegitable broth",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/kaarma_indian_curry.jpeg',
      shop_id: kaarma.id
    }
  ]

  kaarmameal.each do |meal|
    Meal.create!(meal)
  end

  puts "kaarmameal Meal Created"

  koreantable = Shop.find_by(name: "Seoul Sang")
  koreantablemeal = [
    {
      name: 'Beef Bibimbab',
      description: "Beef, assorted vegitables, gochujang, rice, sesame oil",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/korean_table_beef_bibimbop.jpeg',
      shop_id: koreantable.id
    },{
      name: 'Pork Bibimbab',
      description: "Pork, assorted vegitables, gochujang, rice, sesame oil",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/korean_table_pork_bibimbop.jpeg',
      shop_id: koreantable.id
    }
  ]

  koreantablemeal.each do |meal|
    Meal.create!(meal)
  end

  puts "koreantablemeal Meal Created"


  latinofood = Shop.find_by(name: "Mexicano Food")
  latinofoodmeal = [
    {
      name: 'Loaded Nachos',
      description: "Nachos, cheese, sour cream, beef, bacon, grilled onions",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/latino_food_loaded_nachos.jpeg',
      shop_id: latinofood.id
    },{
      name: '3 Tacos',
      description: "Carne asada, chicken, al pastor",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/latino_food_tacos.jpeg',
      shop_id: latinofood.id
    }
  ]

  latinofoodmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "latinofoodmeal Meal Created"

  osaka = Shop.find_by(name: "Hiroshima")
  osakameal = [
    {
      name: 'Karaage Don',
      description: "Fried chicken, rice, soy sauce, vegitables",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/osaka_karaage_don.jpeg',
      shop_id: osaka.id
    },{
      name: 'Spicy Pork Don',
      description: "Spicy pork, rice, gochujang, vegitables, kimchi",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/osaka_spicy_pork_don.jpeg',
      shop_id: osaka.id
    }
  ]

  osakameal.each do |meal|
    Meal.create!(meal)
  end

  puts "osakameal Meal Created"

  pizzamia = Shop.find_by(name: "Mama Mia")
  pizzamiameal = [
    {
      name: 'Salad',
      description: "Greens, chicken, avocado",
      price: 10.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/pizza_mia_salad.jpeg',
      shop_id: pizzamia.id
    },{
      name: 'Vegitable Sandwich',
      description: "Vegitables, mayo, bread toasted",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/pizza_mia_vegi_sandwich.jpeg',
      shop_id: pizzamia.id
    }
  ]

  pizzamiameal.each do |meal|
    Meal.create!(meal)
  end

  puts "pizzamiameal Meal Created"

  primimanti = Shop.find_by(name: "Warner Bros.")
  primimantimeal = [
    {
      name: 'Bolognese',
      description: "Meat, tomato sauce, spaghetti, black pepper, parmasan cheese",
      price: 13.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/primimanti_bros_bolognese.jpeg',
      shop_id: primimanti.id
    }
  ]

  primimantimeal.each do |meal|
    Meal.create!(meal)
  end

  puts "primimantimeal Meal Created"

  tadashi = Shop.find_by(name: "Hon Sushi")
  tadashimeal = [
    {
      name: 'Salmon Roll',
      description: "Salmon, seaweed, rice, vinegrette",
      price: 11.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/tadashi_salmon_roll.jpeg',
      shop_id: tadashi.id
    },{
      name: 'Sushi Platter',
      description: "Assorted fish, rice",
      price: 14.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/tadashi_sushi_platter.jpeg',
      shop_id: tadashi.id
    }
  ]

  tadashimeal.each do |meal|
    Meal.create!(meal)
  end

  puts "tadashimeal Meal Created"


  tavern = Shop.find_by(name: "Minetta Taverna")
  tavernmeal = [
    {
      name: 'Supreme Pasta',
      description: "Shrimp, squid, spaghetti, tomato sauce, onion",
      price: 14.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_tavern_supreme_pasta.jpeg',
      shop_id: tavern.id
    },{
      name: 'Beef Ragu',
      description: "Short rib, tomato sauce, linguini",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_tavern_beef_ragu.jpeg',
      shop_id: tavern.id
    }
  ]

  tavernmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "tavernmeal Meal Created"


  waffle = Shop.find_by(name: "Checker Waffle")
  wafflemeal = [
    {
      name: 'Four Waffles',
      description: "Waffles, strawberries, syrup",
      price: 14.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_waffle_four_waffles.jpeg',
      shop_id: waffle.id
    },{
      name: 'Waffle Mac Fries',
      description: "Beef patties, cheese, bread lettus, tomato, french fries",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/the_waffle_waffle_mac_fries.jpeg',
      shop_id: waffle.id
    }
  ]

  wafflemeal.each do |meal|
    Meal.create!(meal)
  end

  puts "wafflemeal Meal Created"

  yallahb = Shop.find_by(name: "Yahoo Burrito")
  yallahbmeal = [
    {
      name: 'Beef Tacos',
      description: "Beef, Tortilla, onions, cilantros",
      price: 9.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yallah_burrito_beef_taco.jpeg',
      shop_id: yallahb.id
    },{
      name: 'Four Tacoss',
      description: "Beef, al pastor, chicken, vegi tacos",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yallah_burrito_four_tacos.jpeg',
      shop_id: yallahb.id
    }
  ]

  yallahbmeal.each do |meal|
    Meal.create!(meal)
  end

  puts "yallahbmeal Meal Created"

  yum = Shop.find_by(name: "Yummy Cafe")
  yummeal = [
    {
      name: 'Carbonara',
      description: "Spaghetti, eggs, cheese, bacon",
      price: 12.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yum_cafe_carbonara.jpeg',
      shop_id: yum.id
    },{
      name: 'Curliflower Delight',
      description: "Curliflowers, spaghetti, heavy cream, cheese",
      price: 15.99,
      image_url: 'https://blueplate-development.s3.amazonaws.com/seeds/yum_cafe_curliflower_delight.jpeg',
      shop_id: yum.id
    }
  ]

  yummeal.each do |meal|
    Meal.create!(meal)
  end

  puts "yummeal Meal Created"

end

ActiveRecord::Base.transaction do
  Menu.destroy_all
  
  today = Date.today
  tomorrow = Date.today + 1

  week = []
  7.times do |count|
    week << today
    today += 1
  end

  ###############################################
  ######## RUTGERS REAL LIFE EXAMPLES ########
  ###############################################


  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  rutgersShops = Shop.where(school_id: rutgers.id)

  lunch_count = 0
  dinner_count = 0

  rutgersShops.each do |shop|
    week.each do |day|
      sample_lunch_meal = shop.meals.sample
      sample_dinner_meal = shop.meals.sample
      Menu.create!(meal_id: sample_lunch_meal.id, offered_date: day, lunch: true, dinner: false)
      Menu.create!(meal_id: sample_dinner_meal.id, offered_date: day, lunch: false, dinner: true)
      lunch_count += 1
      dinner_count += 1
    end
  end

  puts lunch_count.to_s + " lunch menus in Rutgers created"
  puts dinner_count.to_s + " dinner menus in Rutgers created"


  ###############################################
  ######## PENN STATE REAL LIFE EXAMPLES ########
  ###############################################

  # pennState = School.find_by(name: "Pennsylvania State University–University Park")
  # pennShops = Shop.where(school_id: pennState.id)

  # lunch_count = 0
  # dinner_count = 0

  # pennShops.each do |shop|
  #   week.each do |day|
  #     sample_lunch_meal = shop.meals.sample
  #     sample_dinner_meal = shop.meals.sample
  #     Menu.create!(meal_id: sample_lunch_meal.id, offered_date: day, lunch: true, dinner: false)
  #     Menu.create!(meal_id: sample_dinner_meal.id, offered_date: day, lunch: false, dinner: true)
  #     lunch_count += 1
  #     dinner_count += 1
  #   end
  # end

  # puts lunch_count.to_s + " lunch menus in Penn State created"
  # puts dinner_count.to_s + " dinner menus in Penn State created"

end

ActiveRecord::Base.transaction do
  Reservation.destroy_all
  rutgers = User.find_by(email: 'demo@gmail.com')
  menus = Menu.all

  lunch_time = PickupTime.where(pickup_type: 0)
  dinner_time = PickupTime.where(pickup_type: 1)

  20.times do |t|
    menu_id = menus.sample.id
    if (rand(1..10) < 6)
      lunch_pickup_time_id = lunch_time.sample.id
      Reservation.create!({ menu_id: menu_id, user_id: rutgers.id, pickup_time_id: lunch_pickup_time_id })
    else
      dinner_pickup_time_id = dinner_time.sample.id
      Reservation.create!({ menu_id: menu_id, user_id: rutgers.id, pickup_time_id: dinner_pickup_time_id })
    end
  end

  puts "Reservations created"
end
