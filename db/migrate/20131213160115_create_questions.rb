class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :user_id
      t.integer :section_id
      t.text :section_text
      t.text :body
      t.integer :resource_id

      t.timestamps
    end

    add_index :questions, :resource_id
    add_index :questions, :user_id
    add_index :questions, :section_id
  end
end
