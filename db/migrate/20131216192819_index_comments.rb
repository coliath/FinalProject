class IndexComments < ActiveRecord::Migration
  def change
    add_index :comments, :commentable_type
    add_index :comments, :commentable_id
  end
end
