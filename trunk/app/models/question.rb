class Question < ActiveRecord::Base
 	belongs_to :user
  	belongs_to :category
  	has_many :comments
  	has_many :uploads

	 # Required fields
	 validates :name, presence:true, length: {minimum: 3, maximum: 25}
	 validates :description, presence: true, length: {minimum: 5, maximum: 100}
	 #validates :category_id, presence:true
	 #validates :user_id, presence:true
	 def number_of_comments
	 	comments.count
	 end

	 def status
	 	if zavrseno == "Y"
	 		'Zavrsen'
	 	else 
	 		'U toku'
	 	end
	 end

	 def uposlenik
	 	User.find(uposlenik_id)
	 end

	 def time_created
	 	created_at.strftime("%d.%m.%Y   %H:%M")
	 end

	 def self.chart
	    my_values = []
	     Question.all.each do |c|
	     	my_values << {:label => c.id, :value => c.comments.count }
	     end
	      @collection = [
	        { :key => "Question",
	         :values => my_values
	        }
	      ]
      end
     def self.top
     	questions = Question.all.sort{|q1,q2| q1.number_of_comments <=> q2.number_of_comments}.reverse.take(3)
     end
end

