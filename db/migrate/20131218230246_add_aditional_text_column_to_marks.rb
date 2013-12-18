class AddAditionalTextColumnToMarks < ActiveRecord::Migration
  def change
    add_index :marks, :user_id
    add_index :marks, :resource_id
    add_index :marks, :section_id

    add_column :marks, :additional_note, :text
  end
end
