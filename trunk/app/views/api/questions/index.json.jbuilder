json.array!(@questions) do |question|
  json.extract! question, :id, :name, :description, :user, :category, :created_at, :number_of_comments, :time_created, :zavrseno, :status, :uposlenik_id, :uposlenik
  json.url api_question_url(question, format: :json)
end
