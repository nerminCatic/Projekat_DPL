class Api::AuthController < ApplicationController
  skip_before_action :authenticate_request, :set_current_user, only: [:authenticate]
  respond_to :json
# Authenticate
  def authenticate
  	user_password = params[:password]
    user_email = params[:email]
    user = user_email.present? && User.find_by(email: user_email)

    if user.try(:authenticate, user_password) && user.is_confirmed
      render json: { 
        auth_token: user.generate_auth_token, 
        user_name: user.name, 
		    user_surname: user.surname,
        user_role: user.role.name,
 		    user_id: user.id  }, status: 200
    elsif user.confirmed == 'B'
      render json: { error: "Banovani ste!"}, status: 422
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
# Token status?
  def token_status
    token = params[:token]
    if AuthToken.valid? token
      head 200
    else
      head 401
    end
  end
  
end
