class IndexResources < ActiveRecord::Migration
  def change
  	add_index :resources, :title
  	add_index :resources, :author_name
  end
end
