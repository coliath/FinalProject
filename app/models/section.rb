
# ****** All Attributes ****** #
# user_id
# resource_id
# title
# body
# parent_section_id
# prev_section_id
# next_section_id

class Section < ActiveRecord::Base

  # ****** User generated data ****** #
  attr_accessible :resource_id, :title, :body, :parent_section_id, :prev_section_id, :next_section_id


  # ****** Validations ****** #
  validates :resource_id, :title, :user_id, presence: true

  # ****** Relations ****** #
  belongs_to :resource
  belongs_to :user
  belongs_to :parent_section, class_name: "Section", foreign_key: :parent_section_id, primary_key: :id

  has_one :previous_section, class_name: "Section", foreign_key: :prev_section_id, primary_key: :id
  has_one :next_section, class_name: "Section", foreign_key: :next_section_id, primary_key: :id

  has_many :notes

end
