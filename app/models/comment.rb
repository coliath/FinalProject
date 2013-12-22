class Comment < ActiveRecord::Base
  attr_accessible :body, :commentable_id, :commentable_type

  validates :body, :commentable_id, :commentable_type, presence: true
  validates :commentable_type, inclusion: {in: ["Answer", "Question", "Discussion", "Response"]}

  belongs_to :commentable, polymorphic: true
end
