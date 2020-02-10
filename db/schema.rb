# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_10_081943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_histories", force: :cascade do |t|
    t.integer "account_id", null: false
    t.datetime "date", null: false
    t.string "action_type", null: false
    t.integer "action_data"
    t.integer "resource_id"
    t.text "memo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "account_summaries", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "subscription_id"
    t.integer "policy_id", null: false
    t.integer "total_meal_credits"
    t.integer "meal_credits_left"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "shop_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_favorites_on_shop_id"
    t.index ["user_id", "shop_id"], name: "index_favorites_on_user_id_and_shop_id", unique: true
  end

  create_table "leads", force: :cascade do |t|
    t.string "email", null: false
    t.string "campus"
    t.text "wishlist"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "time_now"
    t.datetime "time_current"
    t.datetime "time_utc"
    t.datetime "time_utc_offset"
  end

  create_table "meals", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.float "price", null: false
    t.string "image_url", null: false
    t.integer "shop_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_number_ordered", default: 0, null: false
    t.index ["shop_id"], name: "index_meals_on_shop_id"
  end

  create_table "menus", force: :cascade do |t|
    t.integer "meal_id", null: false
    t.date "offered_date", null: false
    t.boolean "lunch", default: true
    t.boolean "dinner", default: true
    t.integer "lunch_quantity_available", default: 50, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quantity_ordered", default: 0, null: false
    t.integer "shop_id", null: false
    t.integer "dinner_quantity_available", null: false
    t.index ["shop_id", "offered_date"], name: "index_menus_on_shop_id_and_offered_date", unique: true
  end

  create_table "pickup_times", force: :cascade do |t|
    t.integer "pickup_type", null: false
    t.string "start", null: false
    t.string "end"
  end

  create_table "plans", force: :cascade do |t|
    t.string "name", null: false
    t.string "plan_type"
    t.integer "meals", null: false
    t.float "price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "policies", force: :cascade do |t|
    t.integer "policy_id", null: false
    t.string "name", null: false
    t.string "description", null: false
    t.string "policy_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "promos", force: :cascade do |t|
    t.string "code", null: false
    t.string "description", null: false
    t.string "adjustment_type", null: false
    t.integer "adjustment_value", null: false
    t.integer "quantity", default: 5000, null: false
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_redeemed", default: 0, null: false
    t.index ["code"], name: "index_promos_on_code"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "menu_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "pickup_status", default: false, null: false
    t.integer "pickup_time_id", null: false
    t.integer "pickup_code", default: 1111, null: false
    t.index ["menu_id"], name: "index_reservations_on_menu_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name", null: false
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_orders", force: :cascade do |t|
    t.integer "shop_id", null: false
    t.text "emails", default: [], array: true
    t.string "fax"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_shop_orders_on_shop_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "name", null: false
    t.string "address"
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "school_id", null: false
    t.boolean "show_menu", default: true
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "plan_id", null: false
    t.integer "meal_credit", null: false
    t.date "subscription_start", null: false
    t.date "subscription_end", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "plan_id"], name: "index_subscriptions_on_user_id_and_plan_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "fname"
    t.string "lname"
    t.integer "school_id", default: 1, null: false
    t.string "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
