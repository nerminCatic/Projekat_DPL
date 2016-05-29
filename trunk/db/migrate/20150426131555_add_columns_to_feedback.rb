class AddColumnsToFeedback < ActiveRecord::Migration
  def change
  	add_column :feedbacks, :email, :string
  	add_column :feedbacks, :form, :string
  end
end
