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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131223180751) do

  create_table "answers", :force => true do |t|
    t.integer  "user_id"
    t.integer  "question_id"
    t.text     "body"
    t.boolean  "correct",     :default => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "answers", ["question_id"], :name => "index_answers_on_question_id"
  add_index "answers", ["user_id"], :name => "index_answers_on_user_id"

  create_table "comments", :force => true do |t|
    t.integer  "user_id"
    t.text     "body"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "comments", ["commentable_id"], :name => "index_comments_on_commentable_id"
  add_index "comments", ["commentable_type"], :name => "index_comments_on_commentable_type"

  create_table "discussions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "section_id"
    t.text     "section_text"
    t.string   "title"
    t.text     "body"
    t.integer  "resource_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "discussions", ["resource_id"], :name => "index_discussions_on_resource_id"
  add_index "discussions", ["section_id"], :name => "index_discussions_on_section_id"
  add_index "discussions", ["user_id"], :name => "index_discussions_on_user_id"

  create_table "highlights", :force => true do |t|
    t.integer  "user_id"
    t.integer  "resource_id"
    t.integer  "section_id"
    t.text     "full_text"
    t.text     "additional_note"
    t.string   "highlight_type"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "highlights", ["resource_id"], :name => "index_highlights_on_resource_id"
  add_index "highlights", ["section_id"], :name => "index_highlights_on_section_id"
  add_index "highlights", ["user_id"], :name => "index_highlights_on_user_id"

  create_table "marks", :force => true do |t|
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.integer  "highlight_id"
    t.text     "paragraph_text"
  end

  create_table "notes", :force => true do |t|
    t.integer  "user_id",      :null => false
    t.integer  "resource_id",  :null => false
    t.integer  "section_id"
    t.text     "section_text"
    t.text     "body"
    t.boolean  "private"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "notes", ["resource_id"], :name => "index_notes_on_resource_id"
  add_index "notes", ["user_id"], :name => "index_notes_on_user_id"

  create_table "questions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "section_id"
    t.text     "section_text"
    t.text     "body"
    t.integer  "resource_id"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.string   "title"
    t.boolean  "answered",     :default => false
  end

  add_index "questions", ["resource_id"], :name => "index_questions_on_resource_id"
  add_index "questions", ["section_id"], :name => "index_questions_on_section_id"
  add_index "questions", ["user_id"], :name => "index_questions_on_user_id"

  create_table "resources", :force => true do |t|
    t.string   "title"
    t.string   "sub_title"
    t.string   "author_name"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.text     "description"
    t.string   "topic"
    t.integer  "user_id",     :null => false
  end

  add_index "resources", ["author_name"], :name => "index_resources_on_author_name"
  add_index "resources", ["title"], :name => "index_resources_on_title"
  add_index "resources", ["topic"], :name => "index_resources_on_topic"

  create_table "responses", :force => true do |t|
    t.integer  "user_id"
    t.integer  "discussion_id"
    t.text     "body"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "responses", ["discussion_id"], :name => "index_responses_on_discussion_id"
  add_index "responses", ["user_id"], :name => "index_responses_on_user_id"

  create_table "sections", :force => true do |t|
    t.integer  "resource_id",       :null => false
    t.string   "title",             :null => false
    t.text     "body"
    t.integer  "parent_section_id"
    t.integer  "prev_section_id"
    t.integer  "next_section_id"
    t.integer  "user_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "sections", ["resource_id"], :name => "index_sections_on_resource_id"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "password_digest", :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "session_token",   :null => false
  end

  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

  create_table "votes", :force => true do |t|
    t.integer  "user_id"
    t.string   "vote_type"
    t.integer  "voteable_id"
    t.string   "voteable_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "votes", ["user_id"], :name => "index_votes_on_user_id"
  add_index "votes", ["voteable_id"], :name => "index_votes_on_voteable_id"
  add_index "votes", ["voteable_type"], :name => "index_votes_on_voteable_type"

end
