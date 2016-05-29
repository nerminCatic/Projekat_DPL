class ChangeColumnsInComments < ActiveRecord::Migration
  def change
  	remove_column :comments, :comment
  	remove_column :comments, :description
  	add_column :comments, :content, :string
  end
end
