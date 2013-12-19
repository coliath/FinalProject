# t.integer :user_id
# t.integer :resource_id
# t.integer :section_id
# t.text :full_text
# t.text :additional_note
# t.string :highlight_type


class Highlight < ActiveRecord::Base
  # ****** User generated data ****** #
  attr_accessible :resource_id, :section_id, :full_text, :highlight_type, :additional_note

  # ****** Validations ****** #
  validates :user_id, :resource_id, :section_id, :full_text, :highlight_type, presence: true

  # ****** Relations ****** #
  belongs_to :user
  belongs_to :resource
  belongs_to :section

  has_many :marks

end