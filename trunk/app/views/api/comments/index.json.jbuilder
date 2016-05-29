json.array!(@comments) do |comment|
  json.extract! comment, :id, :name, :content, :user, :question, :time_created
end
