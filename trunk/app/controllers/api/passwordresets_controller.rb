class Api::PasswordresetsController < ApplicationController
  skip_before_action :authenticate_request, :set_current_user
  respond_to :json 
  def new
  end
  
  #service for sending request for reset password
  def create
    user_email = params[:email]
    user = user_email.present? && User.find_by(email: user_email)
    if user
      user.send_password_reset(user) 
      render json: user, status: 200
    else
      render json: { errors: "Invalid email"}, status: 422
    end
  end

  def change_form
    # provjera da li postoji user sa ovim password_reset_token-om
    decoded_token = AuthToken.decode(params[:token])
    if User.find(decoded_token[:user_id])
        user = User.find(decoded_token[:user_id])
        token = params[:token]
        # proslijedjivanje na unos novog passworda ukoliko je token validan
        redirect_to "/#/inputs-password-reset?token=#{token}"
    else
      render json: { errors: "Invalid email"}, status: 422
    end
  end

  #service for reseting password
  def change_pass
    user_new_password = params[:password]
    user_new_password_confirmation = params[:password_confirmation]

    decoded_token = AuthToken.decode(params[:token])
    if User.find(decoded_token[:user_id])
        user = User.find(decoded_token[:user_id])
    #user = User.find_by!(password_reset_token: params[:id])
      #if user.password_reset_sent_at > 2.hours.ago
        user.password = user_new_password
        user.password_confirmation = user_new_password_confirmation
        user.save
        render json: user, status: 200       
      #end 
    else
        render json: { errors: "This link is invalid."}, status: 404
    end
  end
end
#komentar