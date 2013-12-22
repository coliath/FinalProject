class AddIndexestovoteable < ActiveRecord::Migration
  def change
  	add_index :votes, :voteable_id
  	add_index :votes, :voteable_type
  end
end
