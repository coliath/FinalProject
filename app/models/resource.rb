class Resource < ActiveRecord::Base

  # ****** User generated data ****** #
  attr_accessible :title, :sub_title, :author_name, :description, :topic

  # ****** Validations ****** #
  validates :title, :author_name, presence: true

  # ****** Relations ****** #

end
