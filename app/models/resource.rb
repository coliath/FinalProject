
# ****** All Attributes ****** #
# user_id
# title
# sub_title
# author_name
# description
# topic

class Resource < ActiveRecord::Base

  # ****** User generated data ****** #
  attr_accessible :title, :sub_title, :author_name, :description, :topic

  # ****** Validations ****** #
  validates :title, :author_name, :user_id, presence: true

  # ****** Relations ****** #
  has_many :sections
  has_many :notes

  belongs_to :user

end
