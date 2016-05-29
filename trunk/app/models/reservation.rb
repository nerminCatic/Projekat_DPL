class Reservation < ActiveRecord::Base
  belongs_to :user_doctor, class_name: "User"
  belongs_to :user_patient, class_name: "User"
  belongs_to :user_receive, class_name: "User"

  # Required fields
  validates :appointment_date, presence: true
  validates :user_patient_id, presence: true
  validates :status, presence:true, length: {minimum: 1, maximum: 1}
  
end
