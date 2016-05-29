json.array!(@reservations) do |reservation|
  json.extract! reservation, :id, :user_receive, :user_doctor, :user_patient, :appointment_date, :created_at, :updated_at, :status, :receive_date, :confirm_date, :description
end
