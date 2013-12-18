# t.integer :user_id
# t.integer :resource_id
# t.integer :section_id
# t.text :section_text
# t.text :serialized_string
# t.text :additional_note
# t.string :mark_type


class Mark < ActiveRecord::Base
  # ****** User generated data ****** #
  attr_accessible :resource_id, :section_id, :section_text, :serialized_string, :mark_type, :additional_note

  # ****** Validations ****** #
  validates :user_id, :resource_id, :section_id, :section_text, :serialized_string, :mark_type, presence: true

  # ****** Relations ****** #
  belongs_to :user
  belongs_to :resource
  belongs_to :section

end
