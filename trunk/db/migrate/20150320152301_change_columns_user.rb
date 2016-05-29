class ChangeColumnsUser < ActiveRecord::Migration
  def change
  	add_column :users, :email, :string
  	add_column :users, :confirmed, :string
  	remove_column :users, :title, :string
  end
end
