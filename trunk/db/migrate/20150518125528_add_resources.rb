class AddResources < ActiveRecord::Migration
  def up
    drop_table :binaries
    drop_table :uploads
    
    create_table :binaries do |t|
      t.binary :data
    end

    create_table :uploads do |t|
      t.string     :filename
      t.string     :content_type
      t.integer    :size

      t.references :question
      t.references :binary
      t.references :user

      t.timestamps
    end
  end

  def down
    drop_table :binaries
    drop_table :uploads
  end
end
