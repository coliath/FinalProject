class Resource < ActiveRecord::Base

  # ****** User generated data ****** #
  attr_accessible :title, :sub_title, :author_name, :description, :topic, :user_id

  # ****** Validations ****** #
  validates :title, :author_name, presence: true

  # ****** Relations ****** #
  has_many :sections

  belongs_to :user

end
