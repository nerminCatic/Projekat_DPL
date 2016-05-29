class Feedback < ActiveRecord::Base
	# Required fields
	validates :name, presence: true, length: {minimum: 3, maximum: 25}
	validates :description, presence: true

	def self.chart
	    @collection = [
	      { :key => "Compliment", :y => Feedback.where(form: "Compliment").count },
	      { :key => "Complaint", :y => Feedback.where(form: "Complaint").count },
	      { :key => "Suggestion", :y => Feedback.where(form: "Suggestion").count },
	      { :key => "Comment", :y => Feedback.where(form: "Comment").count }
	    ]
  	end
end
