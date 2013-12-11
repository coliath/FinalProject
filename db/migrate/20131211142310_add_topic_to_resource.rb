class AddTopicToResource < ActiveRecord::Migration
  def change
    add_column :resources, :topic, :string
    add_index :resources, :topic
  end
end
