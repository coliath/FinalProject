
# ****** All Attributes ****** #
# user_id
# resource_id
# section_id
# section_text
# body
# private
# timestamps

class Note < ActiveRecord::Base

  # ****** User generated data ****** #
  attr_accessible :section_text, :body, :private, :section_id, :resource_id

  # ****** Validations ****** #
  validates :body, :user_id, :resource_id, presence: true

  # ****** Relations ****** #
  belongs_to :user
  belongs_to :resource
  belongs_to :section


end
