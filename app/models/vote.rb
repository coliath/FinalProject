class Vote < ActiveRecord::Base
  attr_accessible :voteable_type, :voteable_id, :vote_type

  validates :voteable_type, :voteable_id, :voteable_type, :user_id, presence: true
  validates :voteable_type, inclusion: {in: ["Question", "Answer", "Discussion", "Response"]}
  validates :vote_type, inclusion: {in: ["Up", "Down"]}

  belongs_to :user
  belongs_to :voteable, polymorphic: true
end
