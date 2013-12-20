class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :user_id
      t.integer :discussion_id
      t.text :body

      t.timestamps
    end

    add_index :responses, :user_id
    add_index :responses, :discussion_id
  end
end
