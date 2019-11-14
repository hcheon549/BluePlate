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

ActiveRecord::Schema.define(version: 2019_11_14_032328) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_summaries", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "subscription_id", null: false
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

  create_table "reservations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "meal_id", null: false
    t.date "date", null: false
    t.time "time", null: false
    t.datetime "datetime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "pickup_status", default: false, null: false
    t.index ["meal_id"], name: "index_reservations_on_meal_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name", null: false
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shops", force: :cascade do |t|
    t.string "name", null: false
    t.string "address"
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "school_id", null: false
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
    t.integer "meals_left"
    t.string "enrolled_school", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "fname"
    t.string "lname"
    t.integer "school_id", default: 1, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
