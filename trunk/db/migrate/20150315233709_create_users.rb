class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :surname
      t.references :role, index: true
      t.string :adress
      t.string :phone
      t.string :job
      t.string :title

      t.timestamps
    end
  end
end
