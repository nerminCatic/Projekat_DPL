class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.references :user, :user_doctor, index: true
      t.references :user, :user_paitent, index: true
      t.timestamp :appointment

      t.timestamps
    end
  end
end
