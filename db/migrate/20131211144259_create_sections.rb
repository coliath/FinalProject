class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.integer :resource_id, null: false
      t.string :title, null: false
      t.text :body
      t.integer :parent_section_id
      t.integer :prev_section_id
      t.integer :next_section_id
      t.integer :user_id

      t.timestamps
    end

    add_index :sections, :resource_id
  end
end
