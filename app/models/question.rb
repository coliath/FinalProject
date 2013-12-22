class Question < ActiveRecord::Base

  # ****** User generated data ****** #
  attr_accessible :section_id, :resource_id, :section_text, :body, :title

  # ****** Validations ****** #
  validates :user_id, :title, presence: true

  # ****** Relations ****** #
  belongs_to :section
  belongs_to :resource
  belongs_to :user

  has_many :answers
  has_many :comments, as: :commentable
  has_many :votes, as: :voteable

end
