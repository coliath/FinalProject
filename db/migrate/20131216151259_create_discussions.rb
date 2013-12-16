class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.integer :user_id
      t.integer :section_id
      t.text :section_text
      t.string :title
      t.text :body
      t.integer :resource_id

      t.timestamps
    end

    add_index :discussions, :section_id
    add_index :discussions, :user_id
    add_index :discussions, :resource_id
  end
end
