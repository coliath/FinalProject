class TotallyChangeMarksTable < ActiveRecord::Migration
  def change
    remove_column :marks, :resource_id
    remove_column :marks, :user_id
    remove_column :marks, :section_id
    remove_column :marks, :section_text
    remove_column :marks, :additional_note
    remove_column :marks, :mark_type

    add_column :marks, :highlight_id, :integer
    add_column :marks, :paragraph_text, :text
  end
end