json.array!(@categories) do |category|
  json.extract! category, :id, :name, :description
  json.url api_category_url(category, format: :json)
end
