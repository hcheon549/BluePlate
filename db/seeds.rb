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
      name: "12-Meals",  ##### $4.99 per meal
      plan_type: "semester",
      meals: 180,
      price: 898.20
    },
    {
      name: "8-Meals", ##### $5.49 per meal
      plan_type: "semester",
      meals: 120,
      price: 658.80
    },
    {
      name: "4-Meals",  ##### $5.99 per meal
      plan_type: "semester",
      meals: 60,
      price: 359.40
    },
    ################################################
    ###############  4-WEEKS CYCLE  ################
    ################################################
    {
      name: "12-Meals",  ##### $5.99 per meal
      plan_type: "4weeks",
      meals: 48,
      price: 287.52
    },
    {
      name: "9-Meals", ##### $6.39 per meal
      plan_type: "4weeks",
      meals: 36,
      price: 230.04
    },
    {
      name: "6-Meals", ##### $6.69 per meal
      plan_type: "4weeks",
      meals: 24,
      price: 160.56
    },
    {
      name: "3-Meals",  ##### $6.99 per meal
      plan_type: "4weeks",
      meals: 12,
      price: 83.88
    },
    ################################################
    ###############  2-WEEKS TRIAL  ################
    ################################################
    {
      name: "12-Meals",  ##### $4.99 per meal
      plan_type: "2weeks",
      meals: 24,
      price: 119.76
    },
    {
      name: "8-Meals", ##### $5.49 per meal
      plan_type: "2weeks",
      meals: 16,
      price: 87.84
    },
    {
      name: "4-Meals",  ##### $5.99 per meal
      plan_type: "2weeks",
      meals: 8,
      price: 47.92
    },
    ################################################
    ###############       TEST      ################
    ################################################
    {
      name: "1-Meals",  ##### $0.99 per meal
      plan_type: "test",
      meals: 1,
      price: 0.99
    },
    {
      name: "1-Meals",  ##### $0.99 per meal
      plan_type: "test",
      meals: 2,
      price: 1.98
    },
    {
      name: "1-Meals",  ##### $0.99 per meal
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
    },{
      name: "R.U. Grill and Pizza",
      address: "142 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.49929,
      longitude: -74.45327,
      school_id: rutgers.id,
    },{
      name: "Jimmy's Pizza & Grill",
      address: "104 Easton Ave, New Brunswick, NJ 08901",
      latitude: 40.498699,
      longitude: -74.451660,
      school_id: rutgers.id,
    }
    # ,{
    #   name: "King of Gyro",
    #   address: "105 Easton Ave, New Brunswick, NJ 08901",
    #   latitude: 40.49877,
    #   longitude: -74.45167,
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

  rutgers = School.find_by(name: "Rutgers University–New Brunswick")
  # shops = Shop.all

  ###############################################
  ############## RUTGERS PRODUCTION #############
  ###############################################

  bagelnosh = Shop.find_by(name: 'Bagel Nosh')
  bagelnoshmeal = [
    {
      shop_id: bagelnosh.id,
      name: "Pepper Turkey",
      description: "Pepper turkey, jack cheese, lettuce, tomatoes, hot pepper and mustard. Served on a bagel.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1020_pepper_turkey.jpg"
    },{
      shop_id: bagelnosh.id,
      name: "GIMP",
      description: "Grilled chicken, mozzarella cheese, lettuce, tomatoes, olive oil & vinegar. Served on a roll.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1020_gimp.jpg"
    },{
      shop_id: bagelnosh.id,
      name: "Oven Roasted Chicken",
      description: "Boars head sliced chicken, American cheese, bacon, lettuce, tomatoes, honey mustard. Served on a bagel.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1020_roasted_chick.jpg"
    },{
      shop_id: bagelnosh.id,
      name: "Ham & Swiss Crunch",
      description: "Grilled ham, swiss & cheddar cheese, lettuce, tomatoes, and mayo. Served on a garlic roll.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1020_ham_swiss.jpg"
    },
  ]
  bagelnoshmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts bagelnosh.name + " created"

  ###############################################

  kbg = Shop.find_by(name: 'KBG Korean BBQ & Grill')
  kbgmeal = [
    {
      shop_id: kbg.id,
      name: "Bulgogi & White Rice Bowl",
      description: "Bulgogi, white rice with your choice of 2 toppings (bean sprouts, kimchi, kimchi cucumbers, tomato, daikon carrots, fishcake, corn, pickled cucumbers, kale, japchae).",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1013_Bulgogi_White.jpg"
    },{
      shop_id: kbg.id,
      name: "Chicken & Brown Rice",
      description: "Marinated chicken, brown rice with your choice of 2 toppings (bean sprouts, kimchi, kimchi cucumbers, tomato, daikon carrots, fishcake, corn, pickled cucumbers, kale, japchae).",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1013_Chicken_Brown.jpg"
    },{
      shop_id: kbg.id,
      name: "Bulgogi & Kimchi Fried Frice",
      description: "Bulgogi, kimchi friend rice with your choice of 2 toppings (bean sprouts, kimchi, kimchi cucumbers, tomato, daikon carrots, fishcake, corn, pickled cucumbers, kale, japchae).",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1013_bulgogi_kimchi.jpg"
    },{
      shop_id: kbg.id,
      name: "Spicy Pork & White Rice",
      description: "Spicy pork, kimchi fried rice with your choice of 2 toppings (bean sprouts, kimchi, kimchi cucumbers, tomato, daikon carrots, fishcake, corn, pickled cucumbers, kale, japchae).",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1013_SpicyPork_White.jpg"
    },{
      shop_id: kbg.id,
      name: "Spicy Pork & Kimchi Fried Rice",
      description: "Spicy pork, kimchi fried rice with your choice of 2 toppings (bean sprouts, kimchi, kimchi cucumbers, tomato, daikon carrots, fishcake, corn, pickled cucumbers, kale, japchae).",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1013_SpicyPork_Kimchi.jpg"
    }
  ]
  kbgmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts kbg.name + " created"

  ###############################################
  ###############################################

  krispy = Shop.find_by(name: 'Krispy Pizza and Grill')
  krispymeal = [
    {
      shop_id: krispy.id,
      name: "1/2 Meatball Parm Hero & Fries",
      description: "Meatballs, marinara sauce, mozzarella, toasted hero and french fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1031_meatball_fries.jpg"
    },{
      shop_id: krispy.id,
      name: "1/2 Italian Hero and Fries",
      description: "Ham, salami, capicola, provolone, lettuce, tomatoes, salt, pepper, oregano, olive oil & vinegar and french fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1031_italian_fries.jpg"
    },{
      shop_id: krispy.id,
      name: "Chicken Parm Platter with Penne Pasta",
      description: "Fried chicken, tomato sauce, mozzarela, over penne pasta",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1031_chicparm_penne.jpg"
    },{
      shop_id: krispy.id,
      name: "Eggplant Parm Platter with Penne Pasta",
      description: "Breaded eggplant, tomato sauce, mozzarella, over penne pasta.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1031_eggplant_parm.jpg"
    },{
      shop_id: krispy.id,
      name: "Penne Alla Vodka with Italian Bread",
      description: "Penne pasta tossed in our customer favorite vodka sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1031_pennevodka_bread.jpg"
    },{
      shop_id: krispy.id,
      name: "1/2 Cheese Steak Hero and Fries",
      description: "Steak, mozzarella, peppers, onions, french fries..",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1031_cheesesteak_fries.jpg"
    }
  ]
  krispymeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts krispy.name + " created"

  ###############################################
  ###############################################

  popeyes = Shop.find_by(name: 'Popeyes Louisiana Kitchen')
  popeyesmeal = [
    {
      shop_id: popeyes.id,
      name: "Two Chicken Pieces and a Biscuits with 1 Small Side ",
      description: "Side options are french fries, mash potatoes, red beans, and coleslaw",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1030_chicken_sides.jpg"
    }
  ]
  popeyesmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts popeyes.name + " created"
  
  ###############################################
  ###############################################

  douglas = Shop.find_by(name: 'Douglas Pizza & Grill')
  douglasmeal = [
    {
      shop_id: douglas.id,
      name: "Spaghetti Marinara and Meatballs with Garlic Knots",
      description: "Spaghetti marinara and beef meatballs. Served with 2 garlic knots on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_meatball_spaghetti.jpg"
    },{
      shop_id: douglas.id,
      name: "Beef Gyro Platter",
      description: "Sliced beef gyro served over rice with salad and gyro sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_gyro_plattr.jpg"
    },{
      shop_id: douglas.id,
      name: "Baked Ziti and Garlic Knots",
      description: "Oven baked ziti pasta with tomato sauce and mozzarella cheese. Served with 2 garlic knots",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_baked_ziti.jpg"
    },{
      shop_id: douglas.id,
      name: "Cheese Burger Deluxe and French Fries",
      description: "Cheese Burger with lettuce, tomato, onions, ketchup, and mayo. Served with french fries on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_cheeseburger_fries.jpg"
    },{
      shop_id: douglas.id,
      name: "Stuffed Shells and Garlic Knots",
      description: "Four, oven baked mozzarella stuffed shells with marinara sauce. Served with 2 garlic knots on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_stuffed_shells.jpg"
    },{
      shop_id: douglas.id,
      name: "Sausage Roll",
      description: "Baked sausage and mozzarella roll. Served with marinara on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_sausage_roll.jpg"
    },{
      shop_id: douglas.id,
      name: "Grilled Chicken Wrap with Coleslaw",
      description: "Grilled chicken wrap with lettuce, tomato, onions, and mayo. Served with coleslaw on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1022_Chickwrap_coleslaw.jpg"
    }
  ]
  douglasmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts douglas.name + " created"


  ###############################################
  ###############################################

  campuspizza = Shop.find_by(name: 'Campus Pizza')
  campuspizzameal = [
    {
      shop_id: campuspizza.id,
      name: "Personal Cheese Pizza",
      description: "Hand tossed, personal pizza with Philadelphia cheese.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1032_Personal_Pizza.jpg"
    },{
      shop_id: campuspizza.id,
      name: "California Burger and Fries",
      description: "California cheese burger with lettuce, tomatoes, mayo & ketchup. Served with french fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1032_California_Fries.jpg"
    },{
      shop_id: campuspizza.id,
      name: "Stomboli with Green Peppers & Onions",
      description: "Stomboli stuffed with mozzarella, green peppers, and onions.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1032_Stromboli.jpg"
    },{
      shop_id: campuspizza.id,
      name: "Cheese Calzone with Maranara Sauce",
      description: "Stuffed with riccota and mozzarella, onions, and green peppers. Served with maranara sauce on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1032_Calzone.jpg"
    },{
      shop_id: campuspizza.id,
      name: "Chicken Parm Hero",
      description: "Fried chicken breast on a toasted hero with maranara and melted mozzarella.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1032_Chicken_Parm.jpg"
    }
  ]
  campuspizzameal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts campuspizza.name + " created"

  ###############################################
  ###############################################

  jerseymikes = Shop.find_by(name: "Jersey Mike's Subs")
  jerseymikesmeal = [
    {
      shop_id: jerseymikes.id,
      name: "American Classic with Chips",
      description: "Ham, provolone, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1024_american_chips.jpg"
    },{
      shop_id: jerseymikes.id,
      name: "Turkey Provolone with Chips",
      description: "99% fat free turkey, provolone cheese, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1024_turkey_chips.jpg"
    },{
      shop_id: jerseymikes.id,
      name: "Stickball Special with Chips",
      description: "Ham, salami, provolone cheese, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1024_stickball_chips.jpg"
    },{
      shop_id: jerseymikes.id,
      name: "Jersey Shore Favorite with Chips",
      description: "Ham, capocollo, provolone cheese, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1024_jerseyshore_chips.jpg"
    },{
      shop_id: jerseymikes.id,
      name: "Veggie with Chips",
      description: "Provolone, swiss, bell peppers, cucumbers, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1024_veggie_chips.jpg"
    },{
      shop_id: jerseymikes.id,
      name: "Super Sub with Chips",
      description: "Ham, prosciutto, capacollo, provolone cheese, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1024_supersub_chips.jpg"
    }
  ]
  jerseymikesmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts jerseymikes.name + " created"


  ###############################################
  ###############################################

  knightsdeli = Shop.find_by(name: "Knight's Deli")
  knightsdelimeal = [
    {
      shop_id: knightsdeli.id,
      name: "Blazing Scarlet Sandwich and Chips",
      description: "Blazing buffalo chicken, pepper jack cheese, lettuce, tomato, and spicy mustard. Includes a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1014_Blazing_Scarlet.jpg"
    },{
      shop_id: knightsdeli.id,
      name: "Italian Sandwich and Chips",
      description: "Ham, salami, provolone cheese, lettuce, tomato, and mayo. Includes a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1014_Italian.jpg"
    },{
      shop_id: knightsdeli.id,
      name: "The Big East Sandwich and Chips",
      description: "Ham, turkey, swiss cheese, lettuce, tomato, and mayo. Served with a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1014_Big_East.jpg"
    },{
      shop_id: knightsdeli.id,
      name: "The Knight Sandwich and Chips",
      description: "Turkey, roast beef, provolone cheese, lettuce, tomato, and spicy mustard. Served with a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1014_Knights_Sandwich.jpg"
    }
  ]
  knightsdelimeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts knightsdeli.name + " created"

  ###############################################
  ###############################################

  halalguys = Shop.find_by(name: "The Halal Guys")
  halalguysmeal = [
    {
      shop_id: halalguys.id,
      name: "Chicken & Falafel Plattr",
      description: "Chicken, rice, lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_chicken_falafel.jpg"
    },{
      shop_id: halalguys.id,
      name: "Falafel Plattr",
      description: "Falafel, rice, lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_falafel_plattr.jpg"
    },{
      shop_id: halalguys.id,
      name: "Chicken Sandwich",
      description: "Chicken in a pita with lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_chicken_sandwich.jpg"
    },{
      shop_id: halalguys.id,
      name: "Beef Gyro Sandwich",
      description: "Beef in a pita with lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_beef_sandwich.jpg"
    },{
      shop_id: halalguys.id,
      name: "Beef Plattr",
      description: "Beef, rice, lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_beef_plattr.jpg"
    },{
      shop_id: halalguys.id,
      name: "Chicken and Beef Plattr",
      description: "Chicken, beef, rice, lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_beefchicken_plattr.jpg"
    },{
      shop_id: halalguys.id,
      name: "Chicken Plattr",
      description: "Chicken, rice, lettuce, tomatoes, white sauce, hot sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1011_chicken_plattr.jpg"
    }
  ]
  halalguysmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts halalguys.name + " created"

  ###############################################
  ###############################################

  burgerandpizza = Shop.find_by(name: "25 Burgers & Pizza")
  burgerandpizzameal = [
    {
      shop_id: burgerandpizza.id,
      name: "Personal Pepperoni Pizza",
      description: "Pepperoni, mozzarella, tomato sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1017_Pepperoni_Pizza.jpg"
    },{
      shop_id: burgerandpizza.id,
      name: "Cobb Salad & Garlic Knots",
      description: "Lettuce, grape tomatoes, hard boiled eggs, bacon, blue cheese, side of garllic knots.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1017_CobbSalad.jpg"
    },{
      shop_id: burgerandpizza.id,
      name: "Strawberry Salad & Garlic Knots",
      description: "Mixed salad greens, slices strawberries, crumbled walnuts, feta cheese. Garlic knots on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1017_StrawberrySalad.jpg"
    },{
      shop_id: burgerandpizza.id,
      name: "Greek Salad & Garlic Knots",
      description: "Romaine, tomatoes, red onions, black olives, feta cheese. Garlic knots on the side. ",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1017_GreekSalad.jpg"
    },{
      shop_id: burgerandpizza.id,
      name: "Margherita Personal Pizza",
      description: "Personal pizza with tomato sauce, sliced mozzarella, basil.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1017_MargheritaPizza.jpg"
    },{
      shop_id: burgerandpizza.id,
      name: "One Veggie and One Chicken Slice & a Can of Soda",
      description: "Buffalo chicken, vegitable pizza",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1017_chicveggie_soda.jpg"
    }
  ]
  burgerandpizzameal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts burgerandpizza.name + " created"

  ###############################################
  ###############################################

  burgers25 = Shop.find_by(name: "25 Burgers")
  burgers25meal = [
    {
      shop_id: burgers25.id,
      name: "Classic Cheese Burger & Fries",
      description: "Beef patty, American cheese, lettuce, tomatoes, mayo, ketchup, fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1016_cheeseburger_fries.jpg"
    },{
      shop_id: burgers25.id,
      name: "Bacon Cheese Burger & Fries",
      description: "Beef patty, bacon, American cheese, lettuce, tomatoes, mayo, ketchup, french fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1016_BaconBurger_Fries.jpg"
    },{
      shop_id: burgers25.id,
      name: "6 Piece Wings & Fries",
      description: "Breaded wings with french fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1016_Wings_Fries.jpg"
    },{
      shop_id: burgers25.id,
      name: "Turkey Cheese & Cajun Fries",
      description: "Turkey patty, swiss cheese, lettuce, mayo, cajun fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1016_turkeyburger_Fries.jpg"
    },{
      shop_id: burgers25.id,
      name: "Crispy Chicken Burger & Fries",
      description: "Breaded chicken patty, lettuce, tomatoes, mayo, french fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1016_CrispyChicken_Fries.jpg"
    }
  ]
  burgers25meal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts burgers25.name + " created"

  ###############################################
  ###############################################

  cambo = Shop.find_by(name: "Cambo Box")
  cambomeal = [
    {
      shop_id: cambo.id,
      name: "Lemongrass Chicken with Rice",
      description: "Signature Lemongrass Chicken served with pickled veggies or corn.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1028_lemonchick_plattr.jpg"
    },{
      shop_id: cambo.id,
      name: "Soy-Garlic Chicken with Rice",
      description: "Our soy-garlic chicken served with pickled veggies or corn.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1028_soygarlic_chic.jpg"
    },{
      shop_id: cambo.id,
      name: "Lemongrass Chicken Sandwich",
      description: "Lemongrass Chicken Sandwich with Chili Mayo, Cilantro, Pickled Carrots.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1028_lemonchick_sandwich.jpg"
    }
  ]
  cambomeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts cambo.name + " created"

  ###############################################
  ###############################################

  jimmys = Shop.find_by(name: "Jimmy's Pizza & Grill")
  jimmysmeal = [
    {
      shop_id: jimmys.id,
      name: "Two Pepperoni Pizzas with a Can of Soda",
      description: "Pepperoni, tomato sauce, mozzarella, and a can of soda.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1034_pepperoni_soda.jpg"
    }
  ]
  jimmysmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts jimmys.name + " created"

  ###############################################
  ###############################################

  kamfung = Shop.find_by(name: "Kam Fung")
  kamfungmeal = [
    {
      shop_id: kamfung.id,
      name: "Chicken Lo Mein",
      description: "Chicken, noodle, carrot, celery, cabbage",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1018_chic_lomein.jpg"
    },{
      shop_id: kamfung.id,
      name: "General Tso's with White Rice",
      description: "Breaded chicken, General Tso's sauce and fried rice with onions, green onions",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1018_general_tsao.jpg"
    },{
      shop_id: kamfung.id,
      name: "Chicken & Broccoli with White Rice",
      description: "Chicken, broccoli, and white rice.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1018_chic_broccoli.jpg"
    },{
      shop_id: kamfung.id,
      name: "Pork Fried Rice with an Egg Roll",
      description: "Rice, pork, onion, scallion, egg roll",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1018_pork_friedrice.jpg"
    }
  ]
  kamfungmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts kamfung.name + " created"

  ###############################################
  ###############################################

  deliplaza = Shop.find_by(name: "Deli Plaza")
  deliplazameal = [
    {
      shop_id: deliplaza.id,
      name: "Salami & Cheese",
      description: "Salami & American cheese on a roll",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1015_Salami_Cheese.jpg"
    },{
      shop_id: deliplaza.id,
      name: "Tuna Salad Sandwich",
      description: "Tuna salad with mayo and finely chopped carrots and celery. Served on a roll.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1015_Tunasalad_Sandwich.jpg"
    },{
      shop_id: deliplaza.id,
      name: "Two PB&J's with Chocolate Milk",
      description: "2 peanut butter and grape jelly toasted sandwiches with a bottle of chocolate milk.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1015_PBJ_Milk.jpg"
    },{
      shop_id: deliplaza.id,
      name: "Ham & Cheese and Chips",
      description: "Boars head ham & American cheese. Served with a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1015_Hamcheese_Chips.jpg"
    },{
      shop_id: deliplaza.id,
      name: "BLT & Bag of Chip",
      description: "Bacon, lettuce, & tomatoes on toast and a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1015_BLT_Chips.jpg"
    }
  ]
  deliplazameal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts deliplaza.name + " created"

  ###############################################
  ###############################################

  jerseysubs = Shop.find_by(name: "Jersey Subs")
  jerseysubsmeal = [
    {
      shop_id: jerseysubs.id,
      name: "Torpedo Ham and Cheese with Chips",
      description: "Ham, provolone, lettuce, tomatoes, onions, oil & vinegar. Served with a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1021_ham_chips.jpg"
    },{
      shop_id: jerseysubs.id,
      name: "Ham Salami Cheese Torpedo & Chips",
      description: "Ham, salami, provolone, lettuce, tomatoes, oil/vinegar, oregano, and salt. Served with chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1021_hamsalami_chips.jpg"
    },{
      shop_id: jerseysubs.id,
      name: "Torpedo Ham and Cheese with Chips",
      description: "Ham, provolone, lettuce, tomatoes, onions, oil & vinegar. Served with a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1021_ham_chips.jpg"
    },{
      shop_id: jerseysubs.id,
      name: "Torpedo Turkey & Can of Soda",
      description: "Sliced turkey, provolone, lettuce, tomatoes, onions, oil/vinegar. Can of soda.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1021_turkey_soda.jpg"
    },{
      shop_id: jerseysubs.id,
      name: "Torpedo Chicken Salad with Chips",
      description: "Served with lettuce, tomatoes, onions, oil/vinegar, oregano and a bag of chips.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1021_chicsalad_sandwich.jpg"
    },{
      shop_id: jerseysubs.id,
      name: "Caesar Salad",
      description: "Romaine, croutons, tomatoes, parmesan, caesar dressing on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1021_caesar_salad.jpg"
    }
  ]
  jerseysubsmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts jerseysubs.name + " created"

  ###############################################
  ###############################################

  ramenstop = Shop.find_by(name: "Ramen Stop")
  ramenstopmeal = [
    {
      shop_id: ramenstop.id,
      name: "Garlic Tonkotsu Ramen",
      description: "Pork bone stock; soy sauce seasoned, chasu pork belly, crushed garlic, wood ear mushrooms, cabbage and green onions.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1033_tonkatsu_ramen.jpg"
    },{
      shop_id: ramenstop.id,
      name: "Chicken Teriyaki Donburi",
      description: "Grilled teriyaki chicken with white rice, carrots, cabbage, green onions, and sesame seeds.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1033_chick_donburi.jpg"
    }
  ]
  ramenstopmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts ramenstop.name + " created"

  ###############################################
  ###############################################

  elevation = Shop.find_by(name: "Elevation Burger")
  elevationmeal = [
    {
      shop_id: elevation.id,
      name: "3 Chicken Tenders & Fries",
      description: "Crispy organic chicken breast tenders and fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1012_Chictenders_fries.jpg"
    },{
      shop_id: elevation.id,
      name: "Elevation Single & Fries",
      description: "One organic beef patty served on a potato bun with a side of fries.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1012_singleburger_fries.jpg"
    },{
      shop_id: elevation.id,
      name: "Elevation Burger",
      description: "Two organic beef patties, cheddar cheese, lettuce, tomato, pickles and Elevation Sauce",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1012_elevation_burger.jpg"
    },{
      shop_id: elevation.id,
      name: "Veggie Burger",
      description: "A savory blend Veggie patty served on a potato bun of veggies & cheese.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1012_Veggie_burger.jpg"
    },{
      shop_id: elevation.id,
      name: "Elevation Crispy Chicken Sandwich",
      description: "Crispy organic chicken breast tenders, cheddar cheese, lettuce, tomato, pickles and Elevation Sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1012_crispychick_sandwich.jpg"
    },{
      shop_id: elevation.id,
      name: "Elevation Grilled Chicken Sandwich",
      description: "Grilled organic chicken breast tenders, cheddar cheese, lettuce, tomato, pickles and Elevation Sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1012_grilledchick_sand.jpg"
    }
  ]
  elevationmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts elevation.name + " created"
  
  ###############################################
  ###############################################

  giovanneli = Shop.find_by(name: "Giovanneli's Pizza & Grill")
  giovannelimeal = [
    {
      shop_id: giovanneli.id,
      name: "Lamb Plattr",
      description: "Grilled lamb, season rice, lettuce, tomatoes, red onions, pita bread. White sauce on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1026_lamb_plattr.jpg"
    },{
      shop_id: giovanneli.id,
      name: "Chicken Caesar Salad",
      description: "Grilled chicken, romaine, croutons. Caesar dressing on the side.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1026_chicken_caesar.jpg"
    },{
      shop_id: giovanneli.id,
      name: "Two Slices of Buffalo Chicken and Soda",
      description: "Buffalo chicken slices and a can of soda.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1026_buffalochicken_soda.jpg"
    },{
      shop_id: giovanneli.id,
      name: "Cheese Steak Sandwich, Fries and Soda",
      description: "Steak, peppers, onions, American cheese. Served with fries and a can of soda.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1026_cheesesteak_fries.jpg"
    },{
      shop_id: giovanneli.id,
      name: "Two Cheese Slices and a Soda",
      description: "Mozzarella slices with tomato sauce and a can of soda.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1026_cheeseslices_soda.jpg"
    }
  ]
  giovannelimeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts giovanneli.name + " created"


  ###############################################
  ###############################################

  knightsexpress = Shop.find_by(name: "Knights Express Pizza & Grill")
  knightsexpressmeal = [
    {
      shop_id: knightsexpress.id,
      name: "Fat Darrel",
      description: "Chicken fingers, mozzarella sticks, french fries and marinara sauce.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_Fat_Darrel.jpg"
    },{
      shop_id: knightsexpress.id,
      name: "Penne Vodka Pasta",
      description: "Panne, tomato sauce, heavy cream, olive oil, parmasan cheese, garlic bread",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_Penne_Vodka.jpg"
    },{
      shop_id: knightsexpress.id,
      name: "California Cheeseburger & Fries",
      description: "Beef patty, lettus, tomato, red onion, american cheese, french fries",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_California_Cheeseburger.jpg"
    },{
      shop_id: knightsexpress.id,
      name: "6 Buffalo Wings",
      description: "chickn wings, hot sauce",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_Buffalo_Wings.jpg"
    },{
      shop_id: knightsexpress.id,
      name: "Chicken over Rice Plattr",
      description: "Chicken, rice, lettus, red onion, tomato, white sauce, red sauce, pita bread",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_Chicken_Plattr.jpg"
    },{
      shop_id: knightsexpress.id,
      name: "2 Pepperoni Slices",
      description: "Pepperoni, mozzarella cheese, tomato sauce",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_Pepperoni_Slices.jpg"
    },{
      shop_id: knightsexpress.id,
      name: "Grilled Chicken Caesar Salad",
      description: "Lettus, grilled chicken, croutons, carved parmasan cheese, caesar dressing.",
      price: 0,
      image_url: "https://blueplate-development.s3.amazonaws.com/production/1025_Chicken_Caesar.jpg"
    }
  ]
  knightsexpressmeal.each do |meal|
    Meal.create(meal)
    puts meal[:name] + " created"
  end
  puts giovanneli.name + " created"

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
