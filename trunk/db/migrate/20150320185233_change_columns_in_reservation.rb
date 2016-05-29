class ChangeColumnsInReservation < ActiveRecord::Migration
  def change
  	add_column :reservations, :status, :string
  	add_column :reservations, :receive_date, :timestamp
  	add_column :reservations, :confirm_date, :timestamp
  	rename_column :reservations, :user_id, :user_receive_id
  	rename_column :reservations, :user_paitent_id, :user_patient_id
  	rename_column :reservations, :appointment, :appointment_date
  	add_column :reservations, :description, :string
  end
end
