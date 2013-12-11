
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


  # ****** Class Methods ****** #



  # ****** Instance Methods ****** #

  def sorted_sections # returns array
    sections = self.sections
    sorted_sections = []
    first = sections.select { |s| s.prev_section_id.nil? }[0]
    sorted_sections << first

    next_section = first.next_from_array(sections)
    until next_section.nil?
      sorted_sections << next_section
      next_section = next_section.next_from_array(sections)
    end

    sorted_sections
  end

  def as_json(options = {})
    orig = self.attributes
    orig[:sections] = self.sections.map { |s| s.to_json }

    orig
  end


end
