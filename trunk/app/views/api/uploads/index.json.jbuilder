json.array!(@uploads) do |upload|
  json.extract! upload, :id, :filename, :content_type, :size, :question_id, :binary_id, :user_id, :created_at, :updated_at
  json.url api_upload_url(upload, format: :json)
end