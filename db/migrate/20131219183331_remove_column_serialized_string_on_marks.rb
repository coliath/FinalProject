class RemoveColumnSerializedStringOnMarks < ActiveRecord::Migration
  def change
    remove_column :marks, :serialized_string
  end
end
