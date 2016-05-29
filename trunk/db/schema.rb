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

ActiveRecord::Schema.define(version: 20160425135844) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "binaries", force: true do |t|
    t.binary "data"
  end

  create_table "categories", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "content"
  end

  add_index "comments", ["question_id"], name: "index_comments_on_question_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "feedbacks", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
    t.string   "form"
  end

  create_table "questions", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zavrseno"
    t.integer  "uposlenik_id"
  end

  add_index "questions", ["category_id"], name: "index_questions_on_category_id", using: :btree
  add_index "questions", ["user_id"], name: "index_questions_on_user_id", using: :btree

  create_table "reservations", force: true do |t|
    t.integer  "user_receive_id"
    t.integer  "user_doctor_id"
    t.integer  "user_patient_id"
    t.datetime "appointment_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
    t.datetime "receive_date"
    t.datetime "confirm_date"
    t.string   "description"
  end

  add_index "reservations", ["user_doctor_id"], name: "index_reservations_on_user_doctor_id", using: :btree
  add_index "reservations", ["user_patient_id"], name: "index_reservations_on_user_patient_id", using: :btree
  add_index "reservations", ["user_receive_id"], name: "index_reservations_on_user_receive_id", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "uploads", force: true do |t|
    t.string   "filename"
    t.string   "content_type"
    t.integer  "size"
    t.integer  "question_id"
    t.integer  "binary_id"
    t.integer  "user_id"
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
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
    t.string   "confirmed"
    t.string   "password_digest"
    t.string   "auth_token",             default: ""
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.string   "confirm_user_token"
    t.datetime "confirmation_sent_at"
  end

  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree

end
