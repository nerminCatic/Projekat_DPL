json.array!(@dataChart) do |dC|
	 json.extract! dC, :key, :values
end