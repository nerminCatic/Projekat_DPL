class User < ActiveRecord::Base
  belongs_to :role  
  has_many :reservations
  has_many :uploads
  has_many :questions
  has_secure_password

  # Required fields and lengths
	validates :name, presence:true, length: {minimum: 3, maximum: 20}
	validates :surname, presence:true, length: {minimum: 3, maximum: 25}
	validates :role_id, presence:true
  validates :password, length: { minimum: 3 }, allow_nil: true
  
  # Not required fields and lengths
	validates :job, length: {minimum: 2, maximum: 35}

  # Validation for email
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence: true, length: {minimum: 5, maximum: 255}, format: { with: VALID_EMAIL_REGEX },
	                    uniqueness: { case_sensitive: false }
  def is_confirmed
    if confirmed == "Y"
      true
    else
      false
    end
  end
  #metoda za generisanje tokena za prosljedjenu kolonu
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

  #metoda za slanje maila o resetu passworda
  def send_password_reset(user)
    @user = user
    self.password_reset_sent_at = Time.zone.now
    generate_token(:password_reset_token)
    save!
    UserMailer.reset_pass_email(@user).deliver
  end
  #metoda za slanje maila o resetu passworda
  def send_user_confirmation
    @user = self
    self.confirmation_sent_at = Time.zone.now
    generate_token(:confirm_user_token)
    save!
    UserMailer.registration_email(@user).deliver
  end
/
  def generate_authentication_token
      begin
        self.auth_token = Devise.friendly_token
      end while self.class.exists?(auth_token: auth_token)
  end
/
  # JWT token
  def generate_auth_token
    payload = { user_id: self.id }
    AuthToken.encode(payload)
  end

end
