json.array!(@users) do |user|
  json.extract! user, :email, :id, :name, :surname, :role_id, :adress, :phone, :job, :confirmed, :role
  json.url api_user_url(user, format: :json)
  
end
