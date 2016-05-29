# encoding: UTF-8
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

<<<<<<< HEAD
ActiveRecord::Schema.define(version: 20150318100827) do
=======
ActiveRecord::Schema.define(version: 20150318212449) do
>>>>>>> 4299fca7e2cf419693dd43ec5bda975856f3242d

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.string   "name"
    t.text     "comment"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["question_id"], name: "index_comments_on_question_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "feedbacks", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

<<<<<<< HEAD
  create_table "reservations", force: true do |t|
    t.integer  "user_id"
    t.integer  "user_doctor_id"
    t.integer  "user_paitent_id"
    t.datetime "appointment"
=======
  create_table "questions", force: true do |t|
    t.string   "name"
    t.text     "question"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "category_id"
>>>>>>> 4299fca7e2cf419693dd43ec5bda975856f3242d
    t.datetime "created_at"
    t.datetime "updated_at"
  end

<<<<<<< HEAD
  add_index "reservations", ["user_doctor_id"], name: "index_reservations_on_user_doctor_id", using: :btree
  add_index "reservations", ["user_id"], name: "index_reservations_on_user_id", using: :btree
  add_index "reservations", ["user_paitent_id"], name: "index_reservations_on_user_paitent_id", using: :btree
=======
  add_index "questions", ["category_id"], name: "index_questions_on_category_id", using: :btree
  add_index "questions", ["user_id"], name: "index_questions_on_user_id", using: :btree
>>>>>>> 4299fca7e2cf419693dd43ec5bda975856f3242d

  create_table "roles", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "surname"
    t.integer  "role_id"
    t.string   "adress"
    t.string   "phone"
    t.string   "job"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree

end
