class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :user_id, null: false
      t.integer :resource_id, null: false
      t.integer :section_id

      t.text :section_text
      t.text :body
      t.boolean :private

      t.timestamps
    end

    add_index :notes, :user_id
    add_index :notes, :resource_id
  end
end
