json.array!(@roles) do |role|
  json.extract! role, :id, :name, :description
  json.url api_role_url(role, format: :json)
end
