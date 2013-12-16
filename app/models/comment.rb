class Comment < ActiveRecord::Base
  attr_accessible :body, :commentable_id, :commentable_type

  validates :body, :commentable_id, :commentable_type

  belongs_to :commentable, polymorphic: true
  has_many :comments, as: :commentable
end
