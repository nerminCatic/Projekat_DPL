json.array!(@dataChart) do |dC|
 	json.extract! dC, :key, :y
end
