class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :question

   # Required fields
   #validates :name, presence: true, length: {minimum: 3, maximum: 25}
   #validates :user_id, presence: true
   #validates :question_id, presence: true
   #validates :content, presence: true
   def time_created
	 	created_at.strftime("%d.%m.%Y   %H:%M")
	 end

end
