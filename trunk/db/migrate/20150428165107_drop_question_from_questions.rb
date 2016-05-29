class DropQuestionFromQuestions < ActiveRecord::Migration
  def change
  	remove_column :questions, :question
  end
end
