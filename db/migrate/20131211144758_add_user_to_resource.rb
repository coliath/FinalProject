class AddUserToResource < ActiveRecord::Migration
  def change
    add_column :resources, :user_id, :integer, null: false
  end
end
