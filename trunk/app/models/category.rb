class Category < ActiveRecord::Base
	has_many :questions
	
	# Required fields
	validates :name, presence: true, length: {minimum: 3, maximum: 25}
	validates :description, presence: true

	def self.chart
   	 my_values = []
   	 Category.all.each do |c|
   		my_values << {:label => c.name, :value => c.questions.count }
   	 end
    	@collection = [
      	{ :key => "Category",
     		 :values => my_values
      	}
    	]
      end


end
