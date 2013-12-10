class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
    	t.string :title
    	t.string :sub_title
    	t.string :author_name

      t.timestamps
    end
  end
end
