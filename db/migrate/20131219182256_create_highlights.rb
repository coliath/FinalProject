class CreateHighlights < ActiveRecord::Migration
  def change
    create_table :highlights do |t|
      t.integer :user_id
      t.integer :resource_id
      t.integer :section_id
      t.text :full_text
      t.text :additional_note
      t.string :highlight_type

      t.timestamps
    end

    add_index :highlights, :user_id
    add_index :highlights, :resource_id
    add_index :highlights, :section_id
  end
end
