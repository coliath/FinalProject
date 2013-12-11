
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

  has_many :child_sections, class_name: "Section", foreign_key: :parent_section_id, primary_key: :id
  has_many :notes


  # ****** Class Methods ****** #

  def self.sections_from_resource(id)
    Section.where({resource_id: id})
  end

  # ****** Instance Methods ****** #

  def nest_level # returns zero if top level
    all_sections = self.family

    count = 0
    parent = self.parent_from_array(all_sections)
    until parent.nil?
      count += 1
      parent = parent.parent_from_array(all_sections)
    end

    count
  end

  def family # Psuedo relationship, includes self
    self.class.sections_from_resource(self.resource_id)
  end

  def as_json(options = {})
    orig = self.attributes
    orig[:nest_level] = self.nest_level

    orig
  end

  # ****** Helper Methods ****** #

  def parent_from_array(arr)
    parent = arr.select { |s| s.id == self.parent_section_id }

    return parent[0] unless parent.empty? #throw error if > 1 ?

    nil
  end

  def next_from_array(arr)
    next_section = arr.select { |s| s.prev_section_id == self.id }

    return next_section[0] unless next_section.empty?

    nil
  end

  # ****** Private Methods ****** #
  private



end
