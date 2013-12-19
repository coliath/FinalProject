
class Mark < ActiveRecord::Base
  # ****** User generated data ****** #
  attr_accessible :paragraph_text, :highlight_id

  # ****** Validations ****** #
  validates :paragraph_text, :highlight_id, presence: true

  # ****** Relations ****** #
  belongs_to :highlight
end
