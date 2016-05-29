class AddColumnsToQuestions < ActiveRecord::Migration
  def change
  	add_column :questions, :zavrseno, :string
  end
end
