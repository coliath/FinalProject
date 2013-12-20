class Response < ActiveRecord::Base
  attr_accessible :body, :discussion_id

  # ****** Relations ****** #
  belongs_to :user
  belongs_to :discussion

  has_many :comments, as: :commentable

  # ****** Validations ****** #
  validates :user_id, :body, :discussion_id, presence: true
end
