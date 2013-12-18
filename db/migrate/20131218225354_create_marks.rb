class CreateMarks < ActiveRecord::Migration
  def change
    create_table :marks do |t|

      t.integer :user_id
      t.integer :resource_id
      t.integer :section_id
      t.text :section_text
      t.text :serialized_string
      t.string :mark_type

      t.timestamps
    end
  end
end
