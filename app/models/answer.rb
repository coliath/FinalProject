class Answer < ActiveRecord::Base
  attr_accessible :body, :question_id, :correct

  # ****** Relations ****** #
  belongs_to :user
  belongs_to :question

  has_many :comments, as: :commentable
  has_many :votes, as: :voteable

  # ****** Validations ****** #
  validates :user_id, :body, :question_id, presence: true
end
