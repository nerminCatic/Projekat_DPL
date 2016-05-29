class AddUserToQuestion < ActiveRecord::Migration
  def change
  	add_column :questions, :uposlenik_id, :integer
  end
end
