class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :name
      t.text :comment
      t.text :description
      t.references :user, index: true
      t.references :question, index: true

      t.timestamps
    end
  end
end
