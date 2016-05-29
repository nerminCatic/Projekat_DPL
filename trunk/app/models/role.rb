class Role < ActiveRecord::Base
	has_many :users
	
	# Required fields
    validates :name,  presence: true, length: {minimum: 2, maximum: 20}
    validates :description, presence: true, length: {minimum: 2, maximum: 50}
end
